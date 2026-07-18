$LogPath = Join-Path $env:USERPROFILE 'Downloads\duplicate_report.txt'

function Write-Log {
  param([string]$Message)
  Write-Output $Message
  Add-Content -LiteralPath $LogPath -Value $Message
}

# Shared regex constant
$HashSuffixPattern = '_[A-Fa-f0-9]{6}$'

function Get-NormalizedName {
  param([string]$Name)
  return ($Name -replace $HashSuffixPattern, '')
}

# Clear old log
if (Test-Path $LogPath) { Remove-Item $LogPath }

Write-Log "=== Duplicate Chapter Detection Report ==="
Write-Log "Generated: $(Get-Date)"
Write-Log ""

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

    # Build a map: normalizedName → list of original names
    $map = @{}

    foreach ($chapter in $chapters) {
      $normalized = Get-NormalizedName $chapter.Name

      if (-not $map.ContainsKey($normalized)) {
        $map[$normalized] = @()
      }

      $map[$normalized] += $chapter.Name
    }

    # Detect duplicates
    foreach ($key in $map.Keys) {
      if ($map[$key].Count -gt 1) {
        Write-Log "    Duplicate group detected:"
        Write-Log "      Base name: $key"
        Write-Log "      Folder names:"
        foreach ($name in $map[$key]) {
          Write-Log "        - $name"
        }
        Write-Log ""
      }
    }
  }

  Write-Log ""
}

Write-Log "=== End of Report ==="
