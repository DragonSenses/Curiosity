# This script strips the partial MD5 hash suffix after the last underscore and renames the folder name

# Partial MD5 hash is 6 characters and always preceded by an underscore.

# See below script for example unit tests for expected inputs and outputs

Get-ChildItem -Directory | ForEach-Object {
  $old = $_.Name

  # Strip the last underscore + 6‑char hex hash
  $base = $old -replace '_[A-Fa-f0-9]{6}$', ''

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

# Example
## Input

# Chapter 1_83919d
# Chapter 2_486c07
# Chapter 3_cfad20
# Chapter 4__The_Engineer__743e09
# Chapter 5_well-being_cad841
# Chapter 6_.1_(1)_wind_b9c1bc
# Chapter 7_edge_case_17f218_17f218
# Chapter 8_fbe332_Chapter_8_fbe332
# Chapter 9.5_Volume and Illustrations_9f41f3

## Output

# Chapter 1
# Chapter 2
# Chapter 3
# Chapter 4__The_Engineer_
# Chapter 5_well-being
# Chapter 6_.1_(1)_wind
# Chapter 7_edge_case_17f218
# Chapter 8_fbe332_Chapter_8
# Chapter 9.5_Volume and Illustrations
