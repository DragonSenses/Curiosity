package Java.Java8.ModuleSystem;

/**
 * Java 9 introduced its module system. 
 * 
 * Two design principles that help produce software that's easier to reason about:
 * Separation of Concerns (SoC) and Information Hiding. 
 * 
 * 1. Separation of Concerns is a principle that promotes decomposing a computer 
 * program into distinct features.
 * 
 * Suppose that you need to develop an accounting application that parses expenses
 * in different formats, analyzes them, and provides summary reports to your
 * customer. By applying SoC, you split parsing, analysis, and reporting into 
 * separate parts called modules—cohesive groups of code that have little
 * overlap. In other words, a module groups classes, allowing you to express
 * visibility relationships between classes in your application.
 * 
 * Java 9 modules give you finer-grained control of which classes can see which
 * other classes and allow this control to be checked at compile time.
 * In essence, Java packages don’t support modularity.
 * 
 * The SoC principle is useful at an architectural point of view (such as 
 * model versus view versus controller) and in a low-level approach (such as
 * separating the business logic from the recovery mechanism). The benefits are
 * - Allowing work on individual parts in isolation, which helps team collaboration
 * - Facilitating reuse of separate parts
 * - Easier maintenance of the overall system
 */
public class ModuleSystem {
    
}
