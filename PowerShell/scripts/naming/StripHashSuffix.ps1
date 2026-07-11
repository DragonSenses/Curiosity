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

$RootDir = "D:\books"

# Loop through each Book folder under /books
Get-ChildItem -LiteralPath $RootDir -Directory | ForEach-Object {
  $BookFolder = $_.FullName

  # Process only the immediate subfolders (Chapters) inside each Book folder
  Get-ChildItem -LiteralPath $BookFolder -Directory | ForEach-Object {
    $old = $_.Name
    $base = $old -replace '^(.*?)_.*', '$1'

    # Skip if no change
    if ($base -eq $old) { return }

    $new = $base

    # Collision-safe naming: first is "Chapter 1", duplicates are "Chapter 1 (2)", "(3)", etc.
    if (Test-Path -LiteralPath (Join-Path $BookFolder $new)) {
      $counter = 2
      while (Test-Path -LiteralPath (Join-Path $BookFolder "$base ($counter)")) {
        $counter++
      }
      $new = "$base ($counter)"
    }

    Rename-Item -LiteralPath $_.FullName -NewName $new
  }
}