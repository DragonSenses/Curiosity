// octal.c
#include "../include/octal.h"

// Converts a decimal string to its octal string representation.
char* decimalToOctal(int decimal)
{
  // Allocate space for an octal string
  char* octal = (char*)malloc(12);
  if (octal == NULL) {
      printf("Memory allocation failed.\n");
      exit(1);
  }
  // Convert decimal to octal
  sprintf(octal, "%o", decimal);
  return octal;
}
// Converts a octal string to its decimal string representation.
int octalToDecimal(char octal[])
{
  int decimal = 0;
  int length = strlen(octal);
  for (int i = 0; i < length; i++) {
      decimal = decimal * 8 + (octal[i] - '0');
  }
  return decimal;
}