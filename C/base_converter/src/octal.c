// octal.c
#include "../include/octal.h"
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <ctype.h>

// Converts a decimal integer to its octal string representation.
char* decimalToOctal(int decimal) {
  // Max octal digits for 32-bit int: ceil(log8(2^32)) = 11 + null terminator
  char* octal = (char*)malloc(12);
  if (!octal) {
    fprintf(stderr, "Memory allocation failed.\n");
    exit(EXIT_FAILURE);
  }
  sprintf(octal, "%o", decimal);
  return octal;
}

// Converts an octal string to its decimal integer representation.
int octalToDecimal(const char octal[]) {
  int decimal = 0;
  int length = strlen(octal);

  for (int i = 0; i < length; i++) {
    if (!isdigit(octal[i]) || octal[i] > '7') {
      return -1; // Invalid octal digit
    }
    decimal = decimal * 8 + (octal[i] - '0');
  }

  return decimal;
}