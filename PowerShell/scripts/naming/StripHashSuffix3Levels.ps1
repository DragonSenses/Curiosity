# This script strips the partial MD5 hash suffix after the last underscore and renames the folder name

# Partial MD5 hash is 6 characters and always preceded by an underscore.

# Start at directory 3 levels deep. i.e., 
  # /downloads
    # /LibraryX
      # /NovelY
        # /ChapterZ_abcdef

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

$debug = $true

$HashSuffixPattern = '_[A-Fa-f0-9]{6}$'

function Get-RenamedFolderName {
  param([string]$Name)
  return ($Name -replace $HashSuffixPattern, '')
}

# Level 1: Libraries
Get-ChildItem -Directory | ForEach-Object {
  $library = $_.FullName

  if ($debug) {
    Write-Output "Processing library: $library"
  }

  # Level 2: Novels inside each Library
  Get-ChildItem -Path $library -Directory | ForEach-Object {
    $novel = $_.FullName

    if ($debug) {
      Write-Output "  Processing novel: $novel"
    }

    # Level 3: Chapters inside each Novel
    Get-ChildItem -Path $novel -Directory | ForEach-Object {
      $old = $_.Name
      $base = Get-RenamedFolderName $old

      if ($base -eq $old) { return }

      $target = $base
      $i = 2

      while (Test-Path -LiteralPath (Join-Path $_.Parent.FullName $target)) {
        $target = "$base ($i)"
        $i++
      }

      if ($debug) {
        Write-Output "    $old renamed to $target"
      }

      Rename-Item -LiteralPath $_.FullName -NewName $target
    }
  }
}
