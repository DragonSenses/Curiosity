# This script moves all files in the current directory into folders named after the files (excluding the extension)

# Get all files in the current directory
$files = Get-ChildItem -File

# Get the total number of files
$totalFiles = $files.Count

# Write the total number of files to the host
Write-Host "Total files found: $totalFiles"

# Initialize a counter for the current file number
$currentFileNumber = 0

# Loop through each file
ForEach ($file in $files) {
    # Increment the current file number
    $currentFileNumber++

    # Create a new directory with the base name of the file if it doesn't already exist
    $folderPath = Join-Path -Path $file.DirectoryName -ChildPath $file.BaseName
    if (-not (Test-Path -LiteralPath $folderPath -PathType Container)) {
        $folder = New-Item -ItemType Directory -LiteralPath $folderPath
    } else {
        $folder = Get-Item -LiteralPath $folderPath
    }
    
    # Verify folder is correctly set
    if ($null -eq $folder) {
        Write-Host "Folder creation failed for: $folderPath"
        continue
    } else {
        Write-Host "Folder path: $($folder.FullName)"
    }
    
    # Move the file into the directory
    Move-Item -LiteralPath $file.FullName -Destination $folder.FullName
    
    # Write to the host what is being done
    Write-Host "Moved file '$($file.Name)' to folder '$($folder.Name)' ($currentFileNumber of $totalFiles)"
}

# Write a completion message to the host
Write-Host "All files have been moved successfully!"
