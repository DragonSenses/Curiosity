#include "../include/hex.h"
#include "../include/strutils.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

/**
 * Converts a hexadecimal string to its binary string representation.
 * Returns a dynamically allocated string (caller must free).
 * Returns NULL if input is invalid.
 */
char* hexadecimalToBinary(const char hex[]) {
  if (!hex || strlen(hex) == 0) {
    return NULL;
  }

  // Validate input: must be hex digits only
  for (size_t i = 0; hex[i] != '\0'; i++) {
    if (!isxdigit(hex[i])) {
      return NULL;
    }
  }

  // Convert hex string to integer
  unsigned int hexNum;
  if (sscanf(hex, "%x", &hexNum) != 1) {
    return NULL;
  }

  // Allocate buffer for binary string (max 32 bits + null terminator)
  char binary[33] = {0};
  int i = 0;

  if (hexNum == 0) {
    strcpy(binary, "0");
  } else {
    while (hexNum > 0) {
      binary[i++] = '0' + (hexNum % 2);
      hexNum /= 2;
    }
    binary[i] = '\0';
    reverseString(binary);
  }

  return strdup(binary); // Caller must free
}