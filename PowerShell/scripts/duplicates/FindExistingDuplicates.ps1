$LogPath = Join-Path $env:USERPROFILE 'Downloads\existing_duplicates_report.txt'

function Write-Log {
  param([string]$Message)
  Write-Output $Message
  Add-Content -LiteralPath $LogPath -Value $Message
}

# Regex for folders like:  Chapter 28 (2)
$DuplicatePattern = '^(.*)\s\(\d+\)$'

# Level 1: Libraries
Get-ChildItem -Directory | ForEach-Object {
  $library = $_.FullName
  Write-Log "Library: $library"

  # Level 2: Novels
  Get-ChildItem -Directory -Path $library | ForEach-Object {
    $novel = $_.FullName
    Write-Log "  Novel: $novel"

    # Level 3: Chapters
    $chapters = Get-ChildItem -Directory -Path $novel

    foreach ($chapter in $chapters) {
      if ($chapter.Name -match $DuplicatePattern) {
        Write-Log "    Duplicate folder detected: $($chapter.FullName)"
      }
    }

  }
}
