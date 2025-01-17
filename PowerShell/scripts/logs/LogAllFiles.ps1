# Set input and output paths
$sourcePath = "."
$outputCsvPath = "C:\logs\data.csv"
$outputTxtPath = "C:\logs\data.txt"

# Get all files recursively
$files = Get-ChildItem -LiteralPath $sourcePath -Recurse

# Check if there are no files
if ($files.Count -eq 0) {
    Write-Host "No files found in the specified directory."
    exit
}

# Count total number of files
$totalFiles = $files.Count
$currentFile = 0

# Create an array to store file information
$fileInfo = @()
$baseNames = @()

# Process each file
foreach ($file in $files) {
    $currentFile++
    # Use Write-Progress to display progress
    Write-Progress -Activity "Processing files" -Status "Processing file $currentFile of $totalFiles" -PercentComplete (($currentFile / $totalFiles) * 100)
    
    # Add file information to array
    $fileInfo += $file
    
    # Add base names with extensions to array if the item is a file
    if ($file.PSIsContainer -eq $false) {
        $baseNames += "$($file.Name)"
    }
}

# Export file information to CSV
$fileInfo | Export-Csv -Path $outputCsvPath -NoTypeInformation

# Export base names to text file
$baseNames | Out-File -FilePath $outputTxtPath

# Clear the final progress message
Write-Host "Processing complete. $totalFiles files processed."
