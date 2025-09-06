// hex.c
#include "../include/hex.h"
#include "../include/strutils.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Function to convert hexadecimal to binary and return as a string
char* hexadecimalToBinary(char hex[])
{
    // converting hexadecimal string to integer
    unsigned int hexNum;
    sscanf(hex, "%x", &hexNum);
    // string to store binary number
    char binary[33] = "";
    // converting to hexadecimal
    int i = 0;
    while (hexNum) {
        binary[i++] = '0' + hexNum % 2;
        hexNum /= 2;
    }
    binary[i] = '\0';
    reverseString(binary);

    return strdup(binary);
}