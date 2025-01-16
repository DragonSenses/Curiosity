# Define source and target directories
$SourceDirectory = "C:\Path\To\SourceDirectory"
$TargetDirectory = "C:\Path\To\TargetDirectory"

# Get folder names from both source and target directories
$SourceFolders = Get-ChildItem -LiteralPath $SourceDirectory -Directory | Select-Object -ExpandProperty Name
$TargetFolders = Get-ChildItem -LiteralPath $TargetDirectory -Directory | Select-Object -ExpandProperty Name

# Find folders that are in source but not in target
$SourceOnlyFolders = $SourceFolders | Where-Object { $_ -notin $TargetFolders }
# Find folders that are in target but not in source
$TargetOnlyFolders = $TargetFolders | Where-Object { $_ -notin $SourceFolders }

# Output the results
if ($SourceOnlyFolders.Count -eq 0 -and $TargetOnlyFolders.Count -eq 0) {
    Write-Host "Both directories contain the same folder names."
} else {
    if ($SourceOnlyFolders.Count -gt 0) {
        Write-Host "Folders in source but not in target:"
        $SourceOnlyFolders | ForEach-Object { Write-Host $_ }
    }
    if ($TargetOnlyFolders.Count -gt 0) {
        Write-Host "Folders in target but not in source:"
        $TargetOnlyFolders | ForEach-Object { Write-Host $_ }
    }
}
