# Rule: "A folder ending in (number) is a duplicate only if the base name exists as a sibling."

$DuplicateSuffixPattern = '^(.*)\s\((\d+)\)$'
$folders = Get-ChildItem -Directory -Path $_.FullName

foreach ($folder in $folders) {

  # Does it end with (number)?
  if ($folder.Name -match $DuplicateSuffixPattern) {

    $base = $Matches[1]

    # Check if the base name exists among siblings
    if ($folders.Name -contains $base) {
      Write-Log "Duplicate folder detected: $($folder.FullName)"
    }
  }
}
