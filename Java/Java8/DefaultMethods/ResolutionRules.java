package Java.Java8.DefaultMethods;

/**
 * With the advent of Default Methods, there's the possibility of a class 
 * inheriting more than one method with the same signature. Which version
 * should be used? Such conflicts are rare in practice, but when they do 
 * occur, there must be rules that specify hhow to deal with the conflict. 
 * 
 * Most specific default-providing interface wins. 
 * =========================== Resolution Rules ===============================
 * 
 * 1. Classes always win. A method declaration in the class or a superclass
 * takes priority over any default method declaration.
 * 
 * 2. Otherwise, subinterfaces win: the method with the same signature in the
 * most specific default-providing interface is selected. (If B extends A,
 * B is more specific than A.)
 * 
 * 3. Finally, if the choice is still ambiguous, the class inheriting from
 * multiple interfaces has to explicitly select which default method 
 * implementation to use by overriding it and calling the desired method 
 * explicitly.
 */
public class ResolutionRules {

    /**
     * This case we have Conflicts and Explicit Disambiguation
     */
    public interface A {
        default void hello() {
            System.out.println("Hello from A");
        }
    }

    public interface B {
        default void hello() {
            System.out.println("Hello from B");
        }
    }
    
    // Rule 2 doesn't help as there's no more-specific interface to select
    public class C implements B, A { 
        // To Resolve the conflict we introduce new syntax X.super.m(...)
        public void hello(){
            // Explicitly choosing to call the methhod from interface B
            B.super.hello();
        }
    }

    // public static void main(String... args) {
    //   new D().hello();
    // }
    
    // static interface A {
    
    //   public default void hello() {
    //     System.out.println("Hello from A");
    //   }
    
    // }
    
    // static interface B extends A {
    //     default void hello() {
    //       System.out.println("Hello from B");
    //     }
    // }
    
    // static interface C extends A {
    //     // public static void main(String... args) {
    //     //     new C().hello();
    //     // }
    // }
    
    // static class D implements B, C {
    // }
    

    // public static void main(String... args) {
    //     new D().hello();
    //   }
    
    //   static interface A {
    
    //     public default void hello() {
    //       System.out.println("Hello from A");
    //     }
    
    //   }
    
    //   static interface B extends A {}
    
    //   static interface C extends A {}
    
    //   static class D implements B, C {}
    
}
