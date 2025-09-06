// binary.c
#include "../include/binary.h"
#include <stdlib.h>
#include <string.h>

// Forward declaration for string reversal utility
void reverseString(char *str);

/**
 * Converts a binary string to its decimal integer equivalent.
 *
 * @param binary A null-terminated string containing binary digits (e.g., "1011")
 * @return The decimal representation of the binary input
 */
int binaryToDecimal(char binary[])
{
  int decimal = 0;
  int length = strlen(binary);

  for (int i = 0; i < length; i++)
  {
    // Validate input character
    if (binary[i] != '0' && binary[i] != '1')
    {
      // Invalid character found; return -1 as error code
      return -1;
    }
    decimal = decimal * 2 + (binary[i] - '0');
  }

  return decimal;
}

/**
 * Converts a decimal integer to its binary string representation.
 *
 * @param decimal A non-negative integer
 * @return A dynamically allocated string containing the binary representation
 *         Caller is responsible for freeing the returned string.
 */
char *decimalToBinary(int decimal)
{
  // Handle edge case for zero
  if (decimal == 0)
  {
    char *zeroBinary = (char *)malloc(2);
    if (zeroBinary == NULL)
      return NULL;
    zeroBinary[0] = '0';
    zeroBinary[1] = '\0';
    return zeroBinary;
  }

  // Allocate space for up to 32 bits + null terminator
  char *binary = (char *)malloc(33);
  if (binary == NULL)
    return NULL;

  int i = 0;
  while (decimal)
  {
    binary[i++] = '0' + (decimal & 1); // Extract least significant bit
    decimal >>= 1;                     // Shift right
  }

  binary[i] = '\0';
  reverseString(binary); // Reverse to get correct order
  return binary;
}

/**
 * Converts a binary string to its hexadecimal string representation.
 *
 * @param binary A null-terminated binary string (e.g., "110101")
 * @return A dynamically allocated hexadecimal string (caller must free)
 */
char* binaryToHexadecimal(char binary[]) {
  int length = strlen(binary);
  
  // Pad the binary string with leading zeros to ensure it's a multiple of 4
  int padding = (4 - (length % 4)) % 4;
  int paddedLength = length + padding;

  // Allocate padded binary string
  char* paddedBinary = (char*)malloc(paddedLength + 1);
  if (!paddedBinary) return NULL;

  // Fill padding with '0's
  memset(paddedBinary, '0', padding);
  strcpy(paddedBinary + padding, binary);
  paddedBinary[paddedLength] = '\0';

  // Allocate space for hex string (1 hex digit per 4 bits)
  int hexLength = paddedLength / 4;
  char* hexadecimal = (char*)malloc(hexLength + 1);
  if (!hexadecimal) {
      free(paddedBinary);
      return NULL;
  }

  // Convert each 4-bit group to a hex digit
  for (int i = 0; i < hexLength; i++) {
      int value = 0;
      for (int j = 0; j < 4; j++) {
          value = value * 2 + (paddedBinary[i * 4 + j] - '0');
      }
      hexadecimal[i] = "0123456789ABCDEF"[value];
  }

  hexadecimal[hexLength] = '\0';
  free(paddedBinary);
  return hexadecimal;
}