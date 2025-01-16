# Check source directory for all target folders

# Define source and target directories
$SourceDirectory = "C:\source\"
$TargetDirectory = "C:\target\"

# Get folder names from both source and target directories
$SourceFolders = Get-ChildItem -LiteralPath $SourceDirectory -Directory | Select-Object -ExpandProperty Name
$TargetFolders = Get-ChildItem -LiteralPath $TargetDirectory -Directory | Select-Object -ExpandProperty Name

# Find folders that are in target but not in source
$MissingFoldersInSource = $TargetFolders | Where-Object { $_ -notin $SourceFolders }

# Output the results
if ($MissingFoldersInSource.Count -eq 0) {
    Write-Host "The source directory contains all the folders from the target directory."
} else {
    Write-Host "Folders in target but not in source:"
    $MissingFoldersInSource | ForEach-Object { Write-Host $_ }
}
