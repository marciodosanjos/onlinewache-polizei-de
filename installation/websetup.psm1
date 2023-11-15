<# .SYNOPSIS
	Collection of functions for setup and configuration of IIS sites
.NOTES
	Author: Martin Bene - martin.bene@icomedias.com
.LINK
	http://hybridforms.net
#>

function isAdmin  {
  return ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole(`
          [Security.Principal.WindowsBuiltInRole] "Administrator")	
}

function FixupConnectionstring($cs) {
	$res = $cs -replace "MultipleActiveResultSets\s*=\s*True","MultipleActiveResultSets=False"
	# Check for "Encrypt", set to false if not set
	if (!($res -match "Encrypt\s*=")) {
		if (! ($res.EndsWith(";"))) {
			$res += ";"
		}
		$res +="Encrypt=False"
	}
	return $res
}

function addAcl($user, $path, $permission) {
	# $acl = Get-Acl $path
	$acl = (Get-Item $path).GetAccessControl('Access')
	$access = $user, $permission, "ContainerInherit,ObjectInherit", "None", "Allow"
	$accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule $access
	$acl.SetAccessRule($accessRule)
	$acl | Set-Acl $path
}

function clearAcl($user, $path) {
	# $acl = Get-Acl $path
	$acl = (Get-Item $path).GetAccessControl('Access')
	$acesToRemove = $acl.Access | ?{ $_.IsInherited -eq $false -and $_.IdentityReference -eq $user }
	$acl.RemoveAccessRuleAll($acesToRemove)
	$acl | Set-Acl $path
}

function getPoolUser($siteName) {
	$site = Get-Item "iis:\sites\$SiteName"
	$poolName = $site.applicationPool
	$pool = Get-Item "IIS:\AppPools\$poolName"
	#$identifier = New-Object System.Security.Principal.SecurityIdentifier $pool.applicationPoolSid
	#$user = $identifier.Translate([System.Security.Principal.NTAccount])
	$user=$pool.processModel.userName
	return $user
}

function addPoolAcl($SiteName, $subdir, $permission) {
	$site = Get-Item "iis:\sites\$SiteName"
	$sitePath = $site.physicalPath
	$user = getPoolUser $SiteName
	$aclPath = [IO.Path]::combine($sitePath, $subdir)
	addAcl $user $aclPath $permission
}

function Stop-Pool ($name) {
	$pool=get-item "IIS:\AppPools\$name"
	if ($pool.state -ne "Stopped") {
			Write-Host "Stopping application pool $name" -ForegroundColor Yellow
			$pool.Stop()
	}
	$wait = 5
	while ($wait -gt 0) {
		$have_proc = $false
		$procs = Get-ChildItem IIS:\AppPools\$name\WorkerProcesses
		if ($procs) {
			foreach ($proc in $procs) {
				if ($proc.processId) {
					$p = Get-Process -Id $proc.processId -ErrorAction silentlycontinue
					if ($p) {
						$have_proc = $true
					}
				}
			}
		}	
		if (! $have_proc) {
			break
		} else {
			Write-Host "Waiting for Worker Process to shut down " -ForegroundColor Yellow
			Start-Sleep -seconds 1
			$wait--
		}
	}
	if ($have_proc) {
		$procs = Get-ChildItem IIS:\AppPools\$name\WorkerProcesses
		foreach ($proc in $procs) {
			if ($proc.processId) {
				$p = Get-Process -Id $proc.processId -ErrorAction silentlycontinue
				if ($p) {
					Write-Host "Worker Process for pool $name still running, force shutdown" -ForegroundColor Yellow
					Stop-Process -id $p.id -Force
				}
			}
		}
		Start-Sleep -seconds 1
	}
}

function Start-Pool ($name) {
	$started = $false
	$wait = 10
	while (!$started -and $wait -gt 0) {
		$pool=get-item "IIS:\AppPools\$name"
		if ($pool.state -ne  "Started") {
			Write-Host "Starting application pool $name" -ForegroundColor Yellow
			$pool.Start()
			Start-Sleep -seconds 1
		} else {
			Write-Host "Application pool $name successfully started" -ForegroundColor Yellow
			$started = $true
		}
		$wait--
	}
	if (!$started) {
		Write-Host "Error starting pool $name" -ForegroundColor Red
	}
}

# Formats JSON in a nicer format than the built-in ConvertTo-Json does.
function Format-Json {
    <#
    .SYNOPSIS
        Prettifies JSON output.
    .DESCRIPTION
        Reformats a JSON string so the output looks better than what ConvertTo-Json outputs.
    .PARAMETER Json
        Required: [string] The JSON text to prettify.
    .PARAMETER Minify
        Optional: Returns the json string compressed.
    .PARAMETER Indentation
        Optional: The number of spaces (1..1024) to use for indentation. Defaults to 4.
    .PARAMETER AsArray
        Optional: If set, the output will be in the form of a string array, otherwise a single string is output.
    .EXAMPLE
        $json | ConvertTo-Json  | Format-Json -Indentation 2
    #>
    [CmdletBinding(DefaultParameterSetName = 'Prettify')]
    Param(
        [Parameter(Mandatory = $true, Position = 0, ValueFromPipeline = $true)]
        [string]$Json,

        [Parameter(ParameterSetName = 'Minify')]
        [switch]$Minify,

        [Parameter(ParameterSetName = 'Prettify')]
        [ValidateRange(1, 1024)]
        [int]$Indentation = 4,

        [Parameter(ParameterSetName = 'Prettify')]
        [switch]$AsArray
    )

    if ($PSCmdlet.ParameterSetName -eq 'Minify') {
        return ($Json | ConvertFrom-Json) | ConvertTo-Json -Depth 100 -Compress
    }

    # If the input JSON text has been created with ConvertTo-Json -Compress
    # then we first need to reconvert it without compression
    if ($Json -notmatch '\r?\n') {
        $Json = ($Json | ConvertFrom-Json) | ConvertTo-Json -Depth 100
    }

    $indent = 0
    $regexUnlessQuoted = '(?=([^"]*"[^"]*")*[^"]*$)'

    $result = $Json -split '\r?\n' |
        ForEach-Object {
            # If the line contains a ] or } character, 
            # we need to decrement the indentation level unless it is inside quotes.
            if ($_ -match "[}\]]$regexUnlessQuoted") {
                $indent = [Math]::Max($indent - $Indentation, 0)
            }

            # Replace all colon-space combinations by ": " unless it is inside quotes.
            $line = (' ' * $indent) + ($_.TrimStart() -replace ":\s+$regexUnlessQuoted", ': ')

            # If the line contains a [ or { character, 
            # we need to increment the indentation level unless it is inside quotes.
            if ($_ -match "[\{\[]$regexUnlessQuoted") {
                $indent += $Indentation
            }

            $line
        }

    if ($AsArray) { return $result }
    return $result -Join [Environment]::NewLine
}

function Remove-Module ($siteName, $appName) {
	if (!$siteName -or !$appName) {
		Write-Host "You must specifiy both SiteName and AppName. Not removed" -ForegroundColor Red
		return
	}
	if (! (Test-Path "IIS:\Sites\$siteName\modules\$appName")) {
		Write-Host "specified Module not found. Not removed" -ForegroundColor Red
		return
	}
	
	# Check if directory or web app
	$app = Get-Item "IIS:\Sites\$siteName\modules\$appName"
	if ($app.GetType().Name -eq "ConfigurationElement") {
		# it's a web app, remove the app and the application pool
		$targetPath = $app.PhysicalPath
		$pool = $app.applicationPool
		Stop-Pool $pool
		Start-Sleep -Seconds 5
		Remove-WebApplication -Site $siteName -Name "modules/${appName}"
		Remove-WebAppPool -name $pool
	} else {
		$targetPath = $app.FullName
	}
	# remove the module directory
	Remove-Item -LiteralPath $targetPath -Recurse -Force 
}

function setupSite ($PackageName, $SiteName, $Create, $AppPoolName, $Credentials, $HostHeader, $HostIP, $ThumbPrint, $TargetPath, $LogDir, $AppName, $sni) {
	$created = $false
	# Checking if running as an Administrator
	If (-not (isAdmin))
	{
		Write-Host "You do not currently have Administrator rights." -ForegroundColor Red
		Write-host "Please re-run this script as an Administrator." -ForegroundColor Red
		exit
	}

	# Checking if the specified solution file actually exists
	if (!(Test-Path $PackageName)) {
		Write-Host "Specified Web deploy package $PackageName does not exist" -ForegroundColor Red
		exit
	}

	$exists = $false;
	if ($appName) {
		$objName = "Module"
		$newName = $AppName
		if (Test-Path "IIS:\Sites\$SiteName\modules\$AppName") {
			$exists = $true
		}
	} else {
		$objName = "Web site"
		$newName = $SiteName
		if (Test-Path "IIS:\Sites\$SiteName") {
			$exists = $true
		}
	}

	# Check if site/app exists
	if (! $exists) {
		# No, check if we should create it
		if (!$Create) {
			Write-Host "Specified $objName $newName does not exist and Create parameter not specified" -ForegroundColor Red
			exit
		}
		# Yes, check if all required settings are there
		if (!$AppPoolName) {
			Write-Host "App Pool Name not specified for new $objName" -ForegroundColor Red
			exit
		}
		if (!$TargetPath) {
			Write-Host "TargetPath not specified for new $objName" -ForegroundColor Red
			exit
		} else {
			if (! (Test-Path $TargetPath)) {
				New-Item -ItemType Directory -Path $TargetPath -Force | out-null
				if (! (Test-Path $TargetPath)) {
					Write-Host "TargetPath '$TargetPath' could not be created" -ForegroundColor Red
					exit
				}
			}
		}

		if (!$LogDir) {
				Write-Host "Log Directory not specified for new $objName" -ForegroundColor Yellow
		} else {
			if (! (Test-Path $LogDir)) {
				New-Item -ItemType Directory -Path $LogDir -Force
				if (! (Test-Path $LogDir)) {
					Write-Host "Log Directory '$LogDir' could not be created" -ForegroundColor Red
					exit
				}
			}
		}
		
		if ($ThumbPrint) {
			$cert = dir Cert:\LocalMachine\ -Recurse | Where-Object { $_.Thumbprint -eq $ThumbPrint }
			if (!$cert) {
				Write-Host "Certificate not found in local machine certificate store ." -ForegroundColor Red
				Write-Host "You can run the script without specifying a Thumbprint and assign the certificate at a later time." -ForegroundColor Red
				exit
			}
			$store = Split-Path ($cert.PSParentPath) -Leaf
		}
		# OK, we should be able to create the object
		# check if app pool exists
		if (! (Test-Path "IIS:\AppPools\$AppPoolName" -pathType container)) {
			Write-Host "Application Pool $AppPoolName does not exist, create" -ForegroundColor Yellow
			# create app pool
			$appPool = New-Item "IIS:\AppPools\$AppPoolName"
			$appPool | Set-ItemProperty -Name "managedRuntimeVersion" -Value ""
			$appPool | Set-ItemProperty -Name "startMode" -Value "AlwaysRunning"
			$pm =  $appPool | Get-ItemProperty -Name "processModel"
			$pm.loadUserProfile = $true
			$pm.idleTimeout = [System.Timespan]::FromMinutes(0)
			if ($Credentials) {
				$pm.identityType = "SpecificUser"
				$netCred = $credentials.GetNetworkCredential()
				$userName = $netCred.Domain + '\' + $netCred.UserName
				$pm.userName = $userName
				$pm.password = $netCred.Password
			}
			$appPool | Set-ItemProperty -Name "processModel" -Value $pm
		} else {
			Write-Host "Application Pool $AppPoolName already exists, OK" -ForegroundColor Green
		}
		
		Write-Host "$objName $newName does not exist, create" -ForegroundColor Yellow
		# Now create the object
		if (!$AppName) {
			# Create a new IIS Site
			if ($HostIP) {
				$bindingInformation = "${HostIP}:"
			} else {
				$bindingInformation = "*:"
			}
		
			$httpBinding = $bindingInformation + "80:";
			$bindingInformation += "443:"
			$proto = "https"
		
			if ($HostHeader) {
				$bindingInformation += "$HostHeader";
				$httpBinding += "$HostHeader";
			}
		 
			$site = New-Item "IIS:\Sites\$SiteName" `
					-bindings @(@{protocol="$proto";bindingInformation="${bindingInformation}";sslFlags=$sni}, `
								@{protocol="http";bindingInformation="${httpBinding}"}) `
					-physicalPath $TargetPath
			$site | Set-ItemProperty -Name "applicationPool" -Value $AppPoolName
			$site | Set-ItemProperty -Name "applicationDefaults.preloadEnabled" -Value $true
		
			# bind SSL certificate if required
			if ($true -and $ThumbPrint) {
				Write-Host "Setting SSL Certificate for $SiteName" -ForegroundColor Yellow
				$binding = Get-WebBinding -Name $SiteName -Protocol "https"
				$binding.AddSslCertificate($ThumbPrint, $store)
			}
			$user = getPoolUser $SiteName
		} else {
			$app = New-WebApplication -site $siteName -physicalPath $TargetPath -applicationPool $AppName -Name "Modules\$appName"
			set-itemproperty -Path "IIS:\Sites\$SiteName\Modules\$Appname" -name "preloadEnabled" -value $true
			$user = getPoolUser "$SiteName\Modules\$appName"
		}

		if ($LogDir) {
			addAcl $user $LogDir "Modify"
		}
		
		$created = $true
	} else {
		Write-Host "$objName $newName already exists, OK" -ForegroundColor Green
	}
	return $created
}

function getRandomString($len) {
	 $rng = New-Object System.Security.Cryptography.RNGCryptoServiceProvider
	 [Byte[]] $bytes = 1..$len
	 $rng.getbytes($bytes)
	 return [System.Convert]::ToBase64String($bytes)
}

function simpleSpinner ($idx) {
	$spinchars = @("/","-","\","|")
    $e = "$([char]27)"
    Write-Host "$e[s" -NoNewline
	Write-Host $spinchars[$idx] -NoNewline
    Write-Host "$e[u" -NoNewLine
}

function MSDeploy ($Package, $WebAppName, $SkipExtraFilesOnServer) {
	if ($SkipExtraFilesOnServer) {
		$skipPar = " -enableRule:DoNotDeleteRule"
	} else {
		$skipPar = " -disableRule:DoNotDeleteRule"
	}
	$MSDeploy = "C:\Program Files\IIS\Microsoft Web Deploy V3\msdeploy.exe"
	$pkgPath = Resolve-path $Package
	$arguments = "-source:package='$pkgPath'"+`
	            " -dest:auto,includeAcls=""False"""+`
				" -verb:sync"+`
				" -disableLink:AppPoolExtension"+`
				" -disableLink:ContentExtension"+`
				" -disableLink:CertificateExtension"+`
				" -enableRule:AppOffline"+`
				" -setParam:name='IIS Web Application Name',value='$WebAppName'"+`
				$skipPar

	$escapeparser = '--%'
	$line = 0; $idx=0;
	& $MSDeploy $escapeparser $arguments | % {$line++; if ($line % 50 -eq 0) {$idx++; simpleSpinner ($idx % 4)}; if ($_ -NotMatch "Info: (Adding|Updating)") {Write-Host $_}}
}