#ifndef INCLUDE_OCTAL_H
#define INCLUDE_OCTAL_H

// Converts a decimal integer to its octal string representation.
// Caller must free the returned string.
char* decimalToOctal(int decimal);

// Converts an octal string to its decimal integer representation.
// Returns -1 if input is invalid.
int octalToDecimal(const char octal[]);

#endif // INCLUDE_OCTAL_H