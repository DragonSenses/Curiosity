// binary.c
#include "../include/binary.h"
#include <stdlib.h>
#include <string.h>

// Forward declaration for string reversal utility
void reverseString(char *);

// Converts a binary string to its decimal integer equivalent.
int binaryToDecimal(char binary[])
{
  int decimal = 0;
  int length = strlen(binary);

  for (int i = 0; i < length; i++)
  {
    // TODO: Validate character from input
    decimal = decimal * 2 + (binary[i] - '0');
  }
  return decimal;
}

// Converts a decimal integer to its binary string representation.
char *decimalToBinary(int decimal)
{
  // TODO handle edge case for zero

  // Allocate space for a 32-bit binary string + '\0'
  char *binary = (char *)malloc(33);

  int i = 0;
  while (decimal)
  {
    binary[i++] = '0' + (decimal & 1); // Get LSB
    decimal >>= 1;  // Shift right
  }
  binary[i] = '\0';
  reverseString(binary); // Reverse
  return binary;
}