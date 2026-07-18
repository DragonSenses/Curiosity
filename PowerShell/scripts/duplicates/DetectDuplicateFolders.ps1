# Regex for folders like:  New Folder (2)
$DuplicatePattern = '^(.*)\s\(\d+\)$'

$folders = Get-ChildItem -Directory -Path $_.FullName

foreach ($folder in $folders) {
  if ($folder.Name -match $DuplicatePattern) {
    Write-Log "    Duplicate folder detected: $($folder.FullName)"
  }
}