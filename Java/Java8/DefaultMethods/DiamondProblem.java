package Java.Java8.DefaultMethods;

public class DiamondProblem {
    public interface A {
        default void hello() {
            System.out.println("Hello from A");
        }
    }

    public interface B extends A {
        default void hello() {
            System.out.println("Hello from B");
        }
    }
    
    public class C implements B, A {
        public static void main(String... args) {
            new C().hello();
        }
    }
}
