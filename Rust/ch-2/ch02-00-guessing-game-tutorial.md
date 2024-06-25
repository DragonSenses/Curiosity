# Programming a Guessing Game

- We're diving into Rust through a hands-on project.
- The chapter introduces common Rust concepts, demonstrated in a real program.
- Topics covered include `let`, `match`, methods, associated functions, and external crates.
- Subsequent chapters will explore these ideas further. For now, you'll just practice the fundamentals

We'll implement a classic beginner programming problem: a guessing game. Here's how it works, the program will:

1. Generate a random integer between 1 and 100.
2. Prompt the player to enter a guess.
3. Compare the guess with the generated number:
   - If the guess is too low, provide feedback.
   - If the guess is too high, provide feedback.
   - If the guess is correct, print a congratulatory message and exit.

