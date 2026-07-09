# This script strips the partial MD5 hash suffix after the last underscore and renames the folder name

# Partial MD5 hash is 6 characters and always preceded by an underscore.

# Example
## Input

# Chapter 1_83919d
# Chapter 2_486c07
# Chapter 3_cfad20

## Output

# Chapter 1
# Chapter 2
# Chapter 3

Get-ChildItem -Directory | ForEach-Object {
  $old = $_.Name

  # Strip the last underscore + 6‑char hex hash
  $base = $old -replace '_(?=[A-Fa-f0-9]{6}$)', ''

  # If nothing changed, skip
  if ($base -eq $old) { return }

  $target = $base
  $i = 2

  # Collision loop: increment suffix until name is free
  while (Test-Path -LiteralPath (Join-Path $_.Parent.FullName $target)) {
    $target = "$base ($i)"
    $i++
  }

  Rename-Item -LiteralPath $_.FullName -NewName $target
}