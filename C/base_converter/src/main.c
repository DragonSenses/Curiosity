#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "../include/binary.h"
#include "../include/octal.h"
#include "../include/hex.h"

int main() {
  int menuChoice;
  char input[100]; // Buffer for user input

  while (1) {
    printf("\nMenu:\n");
    printf("1. Decimal to Binary\n");
    printf("2. Binary to Decimal\n");
    printf("3. Decimal to Octal\n");
    printf("4. Octal to Decimal\n");
    printf("5. Hexadecimal to Binary\n");
    printf("6. Binary to Hexadecimal\n");
    printf("7. Exit\n");
    printf("Enter your choice: ");
    
    if (scanf("%d", &menuChoice) != 1) {
      fprintf(stderr, "Invalid input. Please enter a number.\n");
      while (getchar() != '\n'); // Clear input buffer
      continue;
    }

    if (menuChoice == 7) {
      printf("Exit Code Initiated\n");
      break;
    }

    int decimalInput;
    char *result = NULL;

    switch (menuChoice) {
      case 1:
        printf("Enter a decimal number: ");
        if (scanf("%d", &decimalInput) == 1) {
          result = decimalToBinary(decimalInput);
          printf("Decimal to Binary: %s\n", result);
          free(result);
        } else {
          fprintf(stderr, "Invalid decimal input.\n");
        }
        break;

      case 2:
        printf("Enter a binary number: ");
        scanf("%s", input);
        int binaryResult = binaryToDecimal(input);
        if (binaryResult != -1) {
          printf("Binary to Decimal: %d\n", binaryResult);
        } else {
          fprintf(stderr, "Invalid binary input.\n");
        }
        break;

      case 3:
        printf("Enter a decimal number: ");
        if (scanf("%d", &decimalInput) == 1) {
          result = decimalToOctal(decimalInput);
          printf("Decimal to Octal: %s\n", result);
          free(result);
        } else {
          fprintf(stderr, "Invalid decimal input.\n");
        }
        break;

      case 4:
        printf("Enter an octal number: ");
        scanf("%s", input);
        int octalResult = octalToDecimal(input);
        if (octalResult != -1) {
          printf("Octal to Decimal: %d\n", octalResult);
        } else {
          fprintf(stderr, "Invalid octal input.\n");
        }
        break;

      case 5:
        printf("Enter a hexadecimal number: ");
        scanf("%s", input);
        result = hexadecimalToBinary(input);
        if (result) {
          printf("Hexadecimal to Binary: %s\n", result);
          free(result);
        } else {
          fprintf(stderr, "Invalid hexadecimal input.\n");
        }
        break;

      case 6:
        printf("Enter a binary number: ");
        scanf("%s", input);
        result = binaryToHexadecimal(input);
        if (result) {
          printf("Binary to Hexadecimal: %s\n", result);
          free(result);
        } else {
          fprintf(stderr, "Invalid binary input.\n");
        }
        break;

      default:
        printf("Invalid choice. Please enter a valid option.\n");
    }
  }

  return 0;
}