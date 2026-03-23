# This script strips the suffix after the first underscore and renames the folder name

# Example
  ## Input

  # Chapter 1_83919d
  # Chapter 2_486c07
  # Chapter 3_cfad20

  ## Output

  # Chapter 1
  # Chapter 2
  # Chapter 3

# ^(.*?) matches "Chapter 1"
# _.* matches "_83919d"

# - ^ anchors at the start
# - (.*?) lazily captures everything up to the first underscore
# - _.* matches the underscore and everything after
# - $1 replaces the whole match with only the captured prefix

$InputDir = "."

Get-ChildItem -Path $InputDir -Directory | ForEach-Object {
  $old = $_.Name
  $base = $old -replace '^(.*?)_.*', '$1'

  # If no change, skip
  if ($base -eq $old) { return }

  $new = $base

  # If the base name already exists, start numbering at (2)
  if (Test-Path (Join-Path $InputDir $new)) {
    $counter = 2
    while (Test-Path (Join-Path $InputDir "$base ($counter)")) {
      $counter++
    }
    $new = "$base ($counter)"
  }

  Rename-Item -Path $_.FullName -NewName $new
}

