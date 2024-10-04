param (
    [string]$substring = "hello",
    [string]$inputFolder = "C:\Input\",
    [string]$outputFolder = "C:\Output\"
)

# Ensure the output folder exists
if (-not (Test-Path -Path $outputFolder)) {
    New-Item -ItemType Directory -Path $outputFolder
}

# Get-ChildItem (gci) to list files in the specified input directory
# Use a wildcard pattern to match filenames containing the substring
# Move-Item to move the matching files to the output folder

Get-ChildItem -Path $inputFolder -File -Filter "*$substring*" | ForEach-Object {
    Write-Output $_.FullName
    Move-Item -Path $_.FullName -Destination $outputFolder
}
