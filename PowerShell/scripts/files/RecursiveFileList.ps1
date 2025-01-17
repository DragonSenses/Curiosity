# List all files recursively in PowerShell and save the output to a CSV file
Get-ChildItem -Recurse | Export-Csv -Path "C:\output\logs\fileList.csv" -NoTypeInformation
