# Define source and target directories
$SourceDirectory = "C:\Path\To\SourceDirectory"
$TargetDirectory = "C:\Path\To\TargetDirectory"

# Get folder names from both source and target directories
$SourceFolders = Get-ChildItem -LiteralPath $SourceDirectory -Directory | Select-Object -ExpandProperty Name
$TargetFolders = Get-ChildItem -LiteralPath $TargetDirectory -Directory | Select-Object -ExpandProperty Name

# Find common folders present in both source and target
$CommonFolders = $SourceFolders | Where-Object { $_ -in $TargetFolders }

# Output the results
if ($CommonFolders.Count -eq 0) {
    Write-Host "There are no common folders in the source and target directories."
} else {
    Write-Host "Common folders in both source and target directories:"
    $CommonFolders | ForEach-Object { Write-Host $_ }
}
