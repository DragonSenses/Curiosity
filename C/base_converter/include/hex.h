#ifndef INCLUDE_HEX_H
#define INCLUDE_HEX_H

#ifdef __cplusplus
extern "C" {
#endif

/**
 * Converts a hexadecimal string to its binary string representation.
 *
 * @param hex A null-terminated string containing hexadecimal digits (0-9, A-F)
 * @return A dynamically allocated binary string (caller must free)
 */
char* hexadecimalToBinary(const char hex[]);

/**
 * Converts a hexadecimal string to its decimal integer representation.
 *
 * @param hex A null-terminated string containing hexadecimal digits
 * @return The decimal value, or -1 if input is invalid
 */
int hexadecimalToDecimal(const char hex[]);

/**
 * Converts a decimal integer to its hexadecimal string representation.
 *
 * @param decimal A non-negative integer
 * @return A dynamically allocated hexadecimal string (caller must free)
 */
char* decimalToHexadecimal(int decimal);

#ifdef __cplusplus
}
#endif

#endif // INCLUDE_HEX_H