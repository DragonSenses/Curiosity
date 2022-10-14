package Java.Java8.DefaultMethods;

/**
 * Classic Diamond Problem in C++. In which a class can inherit two methods
 * with the same signature, which gets chosen? Here we attempt it in Java
 * through default methods. 
 *                        
 *                        [C]
 *                     /      \
 *                    /        \
 * [A/ +void hello()]           [D]
 *                    \        /
 *                     \      /
 *                        [B]
 * 
 * What default method declaration does D inherit: the one from B or the one from C? 
 * Only A declares a default method. Because the interface is a superinterface 
 * of D, the code prints "Hello from A". IF B has default hello() method
 * with same signature, then conflict needs to be solved explicitly. 
 */
public class Diamond {
  public interface A{
    default void hello(){
      System.out.println("Hello from A");
    }
  }
    
  public interface B extends A { }

  /** 
   * If C has abstract hello() method, it takes priority over default hello() 
   * from interface A becasuse C is more specific. Therefore, class D needs to 
   * provide an explicit implementation of hello; otherwise, the program won't
   * compile
   */ 
  public interface C extends A { 
    // void hello();
  }
  public class D implements B, C {
    public static void main(String... args) {
      // new D().hello();
    }
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
    //   // default void hello() {
    //   //   System.out.println("Hello from C");
    //   // }
    // }
  
    // static class D implements B, C {
    //   public static void main(String[] args){
    //     D d = new D();
    //     d.hello();
    //   }
    // }
// }


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