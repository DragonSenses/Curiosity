# List all files recursively, print file to output and save output to CSV file
# Set input and output paths
$inputPath = "C:\input"
$outputPath = "C:\output\logs\fileList.csv"

# Get files recursively
Get-ChildItem -Path $inputPath -Recurse | Export-Csv -Path $outputPath -NoTypeInformation
