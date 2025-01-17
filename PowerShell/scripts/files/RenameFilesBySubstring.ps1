# Define the substring to be replaced
$substring = "target"

# Define the debug variable
$debug = $true

# Initialize the counter
$fileCount = 0

# Get all files in the current directory and subdirectories
Get-ChildItem -LiteralPath "." -Recurse -File | ForEach-Object {
    try {
        # Check if the file name contains the substring
        if ($_.Name -like "*$substring*") {
            # Replace the substring with an empty string in the file name
            $newName = $_.Name -replace $substring, ""

            # Construct the new file path
            $newPath = Join-Path -Path $_.DirectoryName -ChildPath $newName

            # If debug is true, write the newName and newPath to the host
            if ($debug) {
                Write-Host "Renaming '$($_.FullName)' to '$newPath'"
            }

            # Rename the file
            Rename-Item -Path $_.FullName -NewName $newPath

            # Increment the counter
            $fileCount++
        }
    } catch {
        Write-Host "Error renaming '$($_.FullName)': $_"
    }
}

# Display the total count of files renamed
Write-Host "Total number of files renamed: $fileCount"
