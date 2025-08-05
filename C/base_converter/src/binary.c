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