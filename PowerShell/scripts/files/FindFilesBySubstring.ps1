$substring = "target"

Write-Host "Files containing substring:"

# Initialize the counter
$fileCount = 0

# Get all files in the current directory and subdirectories
Get-ChildItem -LiteralPath "." -Recurse -File | ForEach-Object {
    # Check if the file name contains the substring
    if ($_.Name -like "*$substring*") {
        # Write the file name to the host
        Write-Host "'$($_.FullName)'"
        # Increment the counter
        $fileCount++
    }
}

# Display the total count of files found
Write-Host "Total number of files found: $fileCount"
