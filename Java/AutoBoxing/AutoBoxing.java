package Java.AutoBoxing; // Primitive Specializations
/**
 * Every Java type is either a reference type or a primitive type. But
 * generic parameters can be bound only to reference types, due to how
 * generics are internally implemented. As a result, in Java there are
 * these mechanisms:
 * 1. Boxing mechanism converts a primitive type into a corresponding
 *    reference type (Example: int gets boxed to an Integer)
 * 2. Unboxing mechanism converts a reference type into a corresponding
 *    primitive type.
 * 3. Autoboxing in Java facilitates the task for programmers by having
 *    boxing and unboxing operations done automatically.
 * 
 * HOWEVER, AutoBoxing comes with a performance cost. Boxed values are a
 * wrapper around primitive types and are stored on the heap. Therefore,
 * boxed values use more memory and require additional memory lookups to
 * fetch the wrapped primitive value. 
 */
public class AutoBoxing {
    
}
