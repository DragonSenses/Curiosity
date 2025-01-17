$date = Get-Date -Format "yyyyMMdd"
$filePath = ".\$date.txt"
New-Item -Path $filePath -ItemType File
