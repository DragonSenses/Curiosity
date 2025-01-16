# Define the input and output folder variables
$inputFolder = 'C:\inputFolder'
$outputFolder = 'D:\outputFolder'

# Function to calculate the SHA-256 hash of a file
function Get-FileHashSHA256 {
  param (
      [string]$filePath
  )
  return (Get-FileHash -Algorithm SHA256 -Path $filePath).Hash
}

# Get all files in the input folder
$inputFiles = Get-ChildItem -LiteralPath $inputFolder -Recurse -File

# Compare checksums
foreach ($inputFile in $inputFiles) {
    $relativePath = $inputFile.FullName.Substring($inputFolder.Length)
    $outputFilePath = Join-Path -Path $outputFolder -ChildPath $relativePath

    if (Test-Path -Path $outputFilePath) {
        $inputHash = Get-FileHashSHA256 -filePath $inputFile.FullName
        $outputHash = Get-FileHashSHA256 -filePath $outputFilePath

        if ($inputHash -eq $outputHash) {
            Write-Host "File $relativePath matches between input and output folders."
        } else {
            Write-Host "File $relativePath does NOT match between input and output folders."
        }
    } else {
        Write-Host "File $relativePath does not exist in the output folder."
    }
}
