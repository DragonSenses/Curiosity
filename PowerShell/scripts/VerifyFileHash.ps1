# Compare two files bitwise
$File1 = "C:\Path\To\File1.txt"
$File2 = "C:\Path\To\File2.txt"

# Check if both files exist
if (-not (Test-Path -LiteralPath $File1)) {
    Write-Host "File1 does not exist: $File1"
    exit
}
if (-not (Test-Path -LiteralPath $File2)) {
    Write-Host "File2 does not exist: $File2"
    exit
}

# Get file hashes
$Hash1 = Get-FileHash -LiteralPath $File1
$Hash2 = Get-FileHash -LiteralPath $File2

# Compare hashes
if ($Hash1.Hash -eq $Hash2.Hash) {
    Write-Host "The files are bitwise identical."
} else {
    Write-Host "The files are different."
}
