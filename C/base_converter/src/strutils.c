#include "../include/strutils.h"

void reverseString(char *str) {
    // Add null check to prevent segmentation faults
    if (!str) return;

    int start = 0;
    int end = 0;

    // Find the end of the string
    while (str[end] != '\0') {
        end++;
    }
    end--; // Move to last valid character

    // Swap characters from both ends
    while (start < end) {
        char temp = str[start];
        str[start] = str[end];
        str[end] = temp;
        start++;
        end--;
    }
}