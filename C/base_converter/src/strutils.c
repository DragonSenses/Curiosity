// strutils.c
#include <../include/strutils.h>

// Reverses a string in place.
void reverseString(char* str)
{
    int start = 0;
    int end = strlen(str) - 1;

    // Swap characters from both ends
    while (start < end) {
        char temp = str[start];
        str[start] = str[end];
        str[end] = temp;
        start++;
        end--;
    }
}