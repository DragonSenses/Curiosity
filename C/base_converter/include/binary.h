#ifndef INCLUDE_BINARY_H
#define INCLUDE_BINARY_H

#include <stddef.h> // For size_t if needed

#ifdef __cplusplus
extern "C" {
#endif

/**
 * Converts a binary string to its decimal integer equivalent.
 *
 * @param binary A null-terminated string containing binary digits
 * @return The decimal value, or -1 if input is invalid
 */
int binaryToDecimal(char binary[]);

/**
 * Converts a decimal integer to its binary string representation.
 *
 * @param decimal A non-negative integer
 * @return A dynamically allocated binary string (caller must free)
 */
char* decimalToBinary(int decimal);

/**
 * Converts a binary string to its hexadecimal string representation.
 *
 * @param binary A null-terminated binary string
 * @return A dynamically allocated hexadecimal string (caller must free)
 */
char* binaryToHexadecimal(char binary[]);

#ifdef __cplusplus
}
#endif

#endif // INCLUDE_BINARY_H