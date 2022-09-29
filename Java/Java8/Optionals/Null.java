package Java.Java8.Optionals;

/**
 * Optional class, inspired by Haskell and Skala, encapsulates an optional value.
 * Checking is enforced by the type system. 
 * 
 * When a value is present, the Optional class wraps it. 
 * The absense of a value is modeled with an empty optional returned by method
 * Optional.empty(), which returns a special singleton instance of Optional class.
 * 
 * ---- Optional.empty() vs. Null Reference ----
 * Trying to dereference a null invariably causes NullPointerException, whereas
 * Optional.empty() is a valid, workable object of type Optional.
 * 
 * Declaring Optional<Object> instead of just Object signals that a missing value
 * is permitted there. 
 *  
 * Consistenly using Optional values creates a clear distinction
 * between a missing value that's planned for and a value that's absent only
 * because of a bug in the alogirthm or problem in data. 
 * 
 * NullPointerException is commonly thrown when we examine a field of an object
 * perhaps to determine whether its value is one of two expected forms, only to
 * find that what we're examining is not an object but a null pointer. 
 * 
 * null references are convenient ways to model the absence of a value.
 * 
 * Everytime one doubts a variable could be null, one is obliged to do 
 * defensive checking.  
 * 
 * ============================ Problems With Null ============================
 * - It’s a source of error. NullPointerException is by far the most common
 *  exception in Java.
 * 
 * - It bloats your code. It worsens readability by making it necessary to fill
 *  your code with null checks that are often deeply nested.
 * 
 * - It’s meaningless. It doesn’t have any semantic meaning, and in particular,
 *  it represents the wrong way to model the absence of a value in a statically
 *  typed language.
 * 
 * - It breaks Java philosophy. Java always hides pointers from developers
 *  except in one case: the null pointer.
 * 
 * - It creates a hole in the type system. null carries no type or other
 * information, so it can be assigned to any reference type. This situation is
 * a problem because when null is propagated to another part of the system,
 * you have no idea what that null was initially supposed to be.
 */
public class Null {
    
}
