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

  # Strip the last underscore + 6‑char hash
  $new = $old -replace '_(?=[A-Fa-f0-9]{6}$)', ''

  if ($new -ne $old) {
    Rename-Item -Path $_.FullName -NewName $new
  }
}