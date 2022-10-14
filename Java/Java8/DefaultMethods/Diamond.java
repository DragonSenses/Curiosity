package Java.Java8.DefaultMethods;

// public class DiamondProblem {
//     public interface A {
//         default void hello() {
//             System.out.println("Hello from A");
//         }
//     }

//     public interface B extends A {
//         default void hello() {
//             System.out.println("Hello from B");
//         }
//     }
    
//     public class C implements B, A {
//         public static void main(String... args) {
//             new C().hello();
//         }
//     }
// }


public class Diamond {

    public static void main(String... args) {
      new D().hello();
    }
  
    static interface A {
  
      public default void hello() {
        System.out.println("Hello from A");
      }
  
    }
  
    static interface B extends A {
        default void hello() {
          System.out.println("Hello from B");
        }
    }
  
    static interface C extends A {
      default void hello() {
        System.out.println("Hello from C");
      }
    }
  
    static class D implements B, C {}
  
  }
  