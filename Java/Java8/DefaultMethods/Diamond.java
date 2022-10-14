package Java.Java8.DefaultMethods;

/**
 * Classic Diamond Problem in C++. In which a class can inherit two methods
 * with the same signature, which gets chosen? Here we attempt it in Java
 * through default methods. 
 */
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
      // default void hello() {
      //   System.out.println("Hello from C");
      // }
    }
  
    static class D implements B, C {
      public static void main(String[] args){
        D d = new D();
        d.hello();
      }
    }
  
  }
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