Import-Module Pester

Describe 'Get-RenamedFolderName' {

  BeforeAll {
    $scriptPath = Join-Path $PSScriptRoot '..\..\scripts\naming\Remove-FolderHashSuffix.ps1'
    $resolved = Resolve-Path $scriptPath
    . $resolved
  }

  Context 'Basic hash stripping' {
    It 'removes final underscore + 6-hex hash' {
      Get-RenamedFolderName 'Chapter 1_83919d' | Should -Be 'Chapter 1'
      Get-RenamedFolderName 'Chapter 2_486c07' | Should -Be 'Chapter 2'
    }
  }

  Context 'Complex names with underscores' {
    It 'handles engineer example' {
      Get-RenamedFolderName 'Chapter 4__The_Engineer__743e09' |
      Should -Be 'Chapter 4__The_Engineer_'
    }

    It 'handles wind example' {
      Get-RenamedFolderName 'Chapter 6_.1_(1)_wind_b9c1bc' |
      Should -Be 'Chapter 6_.1_(1)_wind'
    }
  }

}