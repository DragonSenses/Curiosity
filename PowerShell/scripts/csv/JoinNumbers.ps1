#  Turns a list of numbers into a comma-separated string

# "numbers.txt" within the same directory, contains the list of numbers
$csv = (Get-Content numbers.txt) -join ", "

$csv
