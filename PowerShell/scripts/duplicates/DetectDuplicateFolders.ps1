# Regex for folders like:  New Folder (2)
# Rule: "Any folder ending in (number) is a duplicate."

$DuplicatePattern = '^(.*)\s\(\d+\)$'

$folders = Get-ChildItem -Directory -Path $_.FullName

foreach ($folder in $folders) {
  if ($folder.Name -match $DuplicatePattern) {
    Write-Log "    Duplicate folder detected: $($folder.FullName)"
  }
}
