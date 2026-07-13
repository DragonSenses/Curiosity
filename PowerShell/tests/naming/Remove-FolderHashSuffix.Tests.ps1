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

  Context 'Invalid hashes stay unchanged' {
    It 'does not strip non-hex or wrong length' {
      Get-RenamedFolderName 'Chapter 10_zzzzzz'  | Should -Be 'Chapter 10_zzzzzz'
      Get-RenamedFolderName 'Chapter 11_12345'   | Should -Be 'Chapter 11_12345'
      Get-RenamedFolderName 'Chapter 12_12345g'  | Should -Be 'Chapter 12_12345g'
      Get-RenamedFolderName 'Chapter 13_1234567' | Should -Be 'Chapter 13_1234567'
    }
  }

  Context 'Hash not at end' {
    It 'does not strip when hash is not terminal' {
      Get-RenamedFolderName 'Chapter 26_abcdef_notes' |
      Should -Be 'Chapter 26_abcdef_notes'
    }
  }

  Context 'Edge cases' {

    It 'handles names with no underscores at all' {
      Get-RenamedFolderName 'Chapter 99' | Should -Be 'Chapter 99'
    }

    It 'handles names ending with underscore but no hash' {
      Get-RenamedFolderName 'Chapter 100_' | Should -Be 'Chapter 100_'
    }

    It 'handles names with multiple trailing underscores' {
      Get-RenamedFolderName 'Chapter 101___' | Should -Be 'Chapter 101___'
    }

    It 'handles lowercase hex hashes' {
      Get-RenamedFolderName 'Chapter 7_ab12ef' | Should -Be 'Chapter 7'
    }

    It 'handles uppercase hex hashes' {
      Get-RenamedFolderName 'Chapter 8_AB12EF' | Should -Be 'Chapter 8'
    }

    It 'does not strip when hex is embedded inside parentheses' {
      Get-RenamedFolderName 'Chapter 9_(83919d)' | Should -Be 'Chapter 9_(83919d)'
    }

    It 'does not strip when hex is part of a longer suffix' {
      Get-RenamedFolderName 'Chapter 10_83919d_extra' | Should -Be 'Chapter 10_83919d_extra'
    }

    It 'handles unicode characters' {
      Get-RenamedFolderName 'Chap📘ter_1_83919d' | Should -Be 'Chap📘ter_1'
    }

    It 'handles spaces before the hash' {
      Get-RenamedFolderName 'Chapter 11 _83919d' | Should -Be 'Chapter 11 '
    }
  }


}