# List all files recursively, print file to output and save output to CSV file
# Set input and output paths
$inputPath = "C:\input"
$outputPath = "C:\output\logs\fileList.csv"

# Set input and output paths
$inputPath = "C:\input"
$outputPath = "C:\output\logs\fileList.csv"

$debug = $true

# Get files recursively and store in a variable
$files = Get-ChildItem -Path $inputPath -Recurse | ForEach-Object {
    if ($debug) {
        # This is for debugging only; comment out or remove once verified
        Write-Host "File: $($_.FullName)"
    }
    # Ensure the current file object is passed along the pipeline
    $_
}

# Export the file details to CSV
$files | Export-Csv -Path $outputPath -NoTypeInformation
