# Create directories
New-Item -ItemType Directory -Path "src" -Force
New-Item -ItemType Directory -Path "include" -Force

# Define modules and their functions
$modules = @{
    "binary"    = @("binaryToDecimal", "decimalToBinary", "binaryToHexadecimal")
    "octal"     = @("octalToDecimal", "decimalToOctal")
    "hex"       = @("hexadecimalToBinary")
    "strutils"  = @("strrev")
}

# Create .c and .h files with boilerplate
foreach ($module in $modules.Keys) {
    $headerPath = "include\$module.h"
    $sourcePath = "src\$module.c"
    $guard = "INCLUDE_" + $module.ToUpper() + "_H"

    # Header file
    @"
#ifndef $guard
#define $guard

// Function declarations
"@ + ($modules[$module] | ForEach-Object { "void $_();" }) + @"

#endif // $guard
"@ | Set-Content $headerPath

    # Source file
    @"
// $module.c
#include \"../include/$module.h\"

// Function definitions
"@ + ($modules[$module] | ForEach-Object { "void $_() {\n    // TODO: Implement $_\n}\n" }) | Set-Content $sourcePath
}

# Create main.c
@"
// main.c
#include <stdio.h>

int main() {
    printf(\"Number Converter CLI\\n\");
    // TODO: Implement menu and logic
    return 0;
}
"@ | Set-Content "src/main.c"