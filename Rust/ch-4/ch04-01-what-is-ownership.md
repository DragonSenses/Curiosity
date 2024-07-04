# Understanding Ownership

1. **Ownership:**
   - Rust's most unique feature.
   - Enables memory safety guarantees without a garbage collector.
   - Crucial for understanding Rust's behavior.

2. **Related Features:**
   - **Borrowing:** Allows temporary access to data without transferring ownership.
   - **Slices:** Subsets of data (e.g., array slices) that don't own the underlying memory.
   - **Memory Layout:** How Rust organizes data in memory.

Ownership is Rust's most unique feature and has deep implications for the rest of the language. It enables Rust to make memory safety guarantees without needing a garbage collector, so it's important to understand how ownership works. In this chapter, we'll talk about ownership as well as several related features: borrowing, slices, and how Rust lays data out in memory.

## What Is Ownership?  

*Ownership* is a set of rules that govern how a Rust program manages memory. 

**Memory Management:**

All programs have to manage the way they use a computer's memory while running. 

 1. Some languages have garbage collection that regularly looks for no-longer-used memory as the program runs; 
 2. In other languages, the programmer must explicitly allocate and free the memory. 
 3. Rust uses a third approach: **memory is managed through a system of ownership with a set of rules that the compiler checks**. If any of the rules are violated, the program won't compile. 
   - None of the features of ownership will slow down your program while it's running.  

- **Learning Ownership:**
  - New concept for many programmers.
  - Experience and understanding improve natural code development.
  - Solid foundation for Rust's unique features.

When you understand ownership, you'll have a solid foundation for understanding the features that make Rust unique. In this chapter, you'll learn ownership by working through some examples that focus on a very common data structure: strings.  

### The Stack and the Heap

Many programming languages don't require you to think about the stack and the heap very often. But in a systems programming language like Rust, whether a value is on the stack or the heap affects how the language behaves and why you have to make certain decisions. Parts of ownership will be described in relation to the stack and the heap later in this chapter, so here is a brief explanation in preparation.

Both the stack and the heap are parts of memory available to your code to use at runtime, but they are structured in different ways. The stack stores values in the order it gets them and removes the values in the opposite order. This is referred to as *last in, first out*. Think of a stack of plates: when you add more plates, you put them on top of the pile, and when you need a plate, you take one off the top. Adding or removing plates from the middle or bottom wouldn't work as well! Adding data is called *pushing onto the stack*, and removing data is called *popping off the stack*. All data stored on the stack must have a known, fixed size. Data with an unknown size at compile time or a size that might change must be stored on the heap instead.
