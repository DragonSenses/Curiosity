# This script strips the partial MD5 hash suffix after the last underscore and renames the folder name

# Partial MD5 hash is 6 characters and always preceded by an underscore.

# See below script for example unit tests for expected inputs and outputs

$debug = $true
$HashSuffixPattern = '_[A-Fa-f0-9]{6}$'

function Get-RenamedFolderName {
  param(
    [Parameter(Mandatory)]
    [string]$Name
  )

  # Remove trailing _<6-hex>
  return ($Name -replace $HashSuffixPattern, '')
}

Get-ChildItem -Directory | ForEach-Object {
  $old = $_.Name

  # Strip the last underscore + 6‑char hex hash
  $base = $old -replace $HashSuffixPattern, ''

  # If nothing changed, skip
  if ($base -eq $old) { return }

  $target = $base
  $i = 2

  # Collision loop: increment suffix until name is free
  while (Test-Path -LiteralPath (Join-Path $_.Parent.FullName $target)) {
    $target = "$base ($i)"
    $i++
  }

  if ($debug) {
      Write-Output "$old renamed to $target"
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

# Additional Edge Cases
# ---------------------------------------------------------

## Input (invalid hashes — should NOT change)

# Chapter 10_zzzzzz
# Chapter 11_12345
# Chapter 12_12345g
# Chapter 13_1234567

## Output

# Chapter 10_zzzzzz
# Chapter 11_12345
# Chapter 12_12345g
# Chapter 13_1234567


## Input (trailing underscores — should NOT change)

# Chapter 14_
# Chapter 15__
# Chapter 16_edge_

## Output

# Chapter 14_
# Chapter 15__
# Chapter 16_edge_


## Input (multiple underscores before hash)

# Chapter 17_a_b_c_abcdef
# Chapter 18__a__b__c__123abc

## Output

# Chapter 17_a_b_c
# Chapter 18__a__b__c__


## Input (special characters)

# Chapter 19_[draft]_a1b2c3
# Chapter 20_(final)_f00baa
# Chapter 21_[]_abcdef

## Output

# Chapter 19_[draft]
# Chapter 20_(final)
# Chapter 21_[]


## Input (dots)

# Chapter 22.v2_abcdef
# Chapter 23.1.5_123abc

## Output

# Chapter 22.v2
# Chapter 23.1.5


## Input (hash not at end — should NOT change)

# Chapter 26_abcdef_notes
# Chapter 27_notes_abcdef_extra

## Output

# Chapter 26_abcdef_notes
# Chapter 27_notes_abcdef_extra


## Input (collision scenarios)

# Chapter 28_aaaaaa
# Chapter 28_bbbbbb
# Chapter 28_cccccc

## Output

# Chapter 28
# Chapter 28 (2)
# Chapter 28 (3)


## Input (collision with existing folder)

# Existing folder: Chapter 29
# Chapter 29_aaaaaa

## Output

# Chapter 29 (2)


## Input (collision with suffix already present)

# Chapter 30_aaaaaa
# Chapter 30 (2)_bbbbbb
# Chapter 30 (3)_cccccc

## Output

# Chapter 30
# Chapter 30 (2)
# Chapter 30 (3)


## Input (unicode)

# Chapître 31_abcdef
# 章节 32_123abc
# Kapitel 33_ffeedd

## Output

# Chapître 31
# 章节 32
# Kapitel 33


## Input (leading/trailing spaces)

# "Chapter 34 _abcdef"
# " Chapter 35_abcdef"

## Output

# "Chapter 34 "
# " Chapter 35"


## Input (reserved Windows device names)

# Chapter 36_con_abcdef
# Chapter 37_prn_abcdef

## Output

# Chapter 36_con
# Chapter 37_prn

# Note: If the stripped name becomes exactly "con", "prn", "aux", etc.,
# Windows will reject the rename.


## Input (names that become empty)

# _abcdef
# ______abcdef

## Output

# ""        # invalid → rename fails
# "_____"   # valid but unusual