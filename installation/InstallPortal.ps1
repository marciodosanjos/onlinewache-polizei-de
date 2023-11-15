<# .SYNOPSIS
	Install/Update and Configure Portal Onlinewache Web Application
.DESCRIPTION
	Use this script to install/update a Portal Onlinewache Web Application installation.
.NOTES
	Author: Martin Bene - martin.bene@icomedias.com
.LINK
	http://hybridforms.net
	
.PARAMETER PackageName
	Path/Filename of the Web Deploy Package. Defaults to ".\Onlinewache.Portal.zip"
.PARAMETER SiteName
	name of the IIS Site to install
.PARAMETER CreateSite
	Create new IIS Site if specified site does not exist
.PARAMETER AppPoolName
	name of the Application Pool to use for the Site defaults to SiteName (creation only)
.PARAMETER Credentials
	Credentials to use for the application pool; use $cred=Get-Credential interactively before runni9ng script (creation only)
.PARAMETER HostHeader
	Http Host Header (creation only)
.PARAMETER HostIP
	IP Address to bind site to (creation only)
.PARAMETER ThumbPrint
	ThumbPrint of SSL Certificate to use for https binding (creation only)
.PARAMETER Sni
	Use SNI for HTTPS binding when creating IIS Site(s) (creation only)
.PARAMETER TargetPath
	Target directory (creation conly)
.PARAMETER SetupIPSecurity
	Optionaly setup IP Security to mitigate DoS
#>

Param(
	[string]$PackageName = ".\Onlinewache.Portal.zip",
	
	[Parameter(Mandatory=$true)]
	[string]$SiteName,
	[switch]$CreateSite,
	[string]$AppPoolName = $SiteName,
	[PSCredential]$Credentials,
	[string]$HostHeader,
	[string]$HostIP,
	[string]$ThumbPrint,
	[switch]$Sni,
	[string]$TargetPath,
	[switch]$SetupIPSecurity
)
	
Import-Module WebAdministration
Import-Module "$PSScriptRoot\websetup.psm1"

$UseSNI = 0;
if ($sni.isPresent) {
	$UseSNI = 1;
}

$created = setupSite $PackageName $SiteName $CreateSite $AppPoolName $Credentials $HostHeader $HostIP $ThumbPrint $TargetPath $null $null $UseSNI
# remove server Header
Set-WebConfigurationProperty -pspath 'MACHINE/WEBROOT/APPHOST'  -filter "system.webServer/security/requestFiltering" -name "removeServerHeader" -value "True"

# before deploying, stop, remove hanging jobs and clean out node_modules directory
$site = Get-Item "iis:\sites\$SiteName"
$name=$site.applicationPool
Stop-Pool $name

# setup IP security if requested
if ($SetupIPSecurity) {
	Install-WindowsFeature Web-IP-Security | out-null
	Set-WebConfigurationProperty -PSPath 'IIS:\' -location $SiteName -filter system.webServer/security/dynamicIpSecurity/denyByConcurrentRequests -name maxConcurrentRequests -value 50
	Set-WebConfigurationProperty -PSPath 'IIS:\' -filter "system.applicationHost/sites/site[@name = ""$SiteName""]/limits" -name connectionTimeout -value "00:02:00"
}

# Now deploy the external app
Write-Host "Importing Web Application from Web deploy Package" -ForegroundColor Yellow
MSDeploy $PackageName "${SiteName}\" $true

# restart application pool
Start-Pool $name
