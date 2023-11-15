<# .SYNOPSIS
	Package Onlinewache Portal
.DESCRIPTION
	Use this script to Create a distribution archive of onlinewache portal
.NOTES
	Author: Martin Bene - martin.bene@icomedias.com
.LINK
	http://hybridforms.net
	
.PARAMETER fingerprint
	fingerprint of signing certificate
.PARAMETER NuGet
	Path/Filename of Nuget.exe
	
#>

Param(
	[string]$fingerprint = "2eebcdd46449560369ce7fff037ebf3daccd0500",
	[string]$NuGet = ".\nuget.exe"
)

New-Item -ItemType Directory -Path ..\out -Force | Out-Null
$SourcePath= Resolve-Path "..\out"
$SourceMatch = "^$($SourcePath.Path.Replace("\","\\"))$"
$ConfigPath = Resolve-Path "..\package.json"

$cfg = Get-Content -Raw -Path $ConfigPath -Encoding UTF8 | ConvertFrom-Json
$Version = $cfg.version

New-Item -ItemType Directory -Path ..\deploy -Force | Out-Null
$deploy = Resolve-path ..\deploy

$DeployName = "${deploy}\Onlinewache.Portal.zip"
$PackageName = "${deploy}\Onlinewache.Portal.${Version}.zip"
$paramName = "${deploy}\Portal.Parameters.xml"
$ManifestName = "${deploy}\Portal.SourceManifest.xml"
$specfile = "Onlinewache.Portal.nuspec"

cd ..
Remove-Item -Recurse out
npm run build 
cd installation
$param = @"
<?xml version="1.0" encoding="utf-8"?>
<parameters>
  <parameter name="IIS Web Application Name" description="" value="/" tags="IisApp">
    <parameterEntry kind="ProviderPath" scope="IisApp" match="${PublishMatch}" />
  </parameter>
</parameters>
"@
[System.IO.File]::WriteAllText($paramName, $param)
$manifest = @"
<?xml version="1.0" encoding="utf-8"?>
<sitemanifest>
  <IisApp path="${SourcePath}" />
</sitemanifest>
"@
[System.IO.File]::WriteAllText($ManifestName, $manifest)
& 'C:\Program Files\IIS\Microsoft Web Deploy V3\msdeploy.exe' -verb:sync -declareParamFile:$paramName -source:manifest=$ManifestName -dest:package=$DeployName
Compress-Archive -force -DestinationPath "$PackageName" -Path websetup.psm1,InstallPortal.ps1,$DeployName,$specfile
&$NuGet sign $PackageName -CertificateFingerprint $fingerprint -timestamper http://timestamp.sectigo.com
Remove-Item $DeployName
