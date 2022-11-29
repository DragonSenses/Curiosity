/* Garbage Collection in JavaScript
Summary
    -Garbage collection is performed automatically. We cannot force or prevent it.
    - Objects are retained in memory while they are reachable.
    - Being referenced is not the same as being reachable (from a root): a pack 
    of interlinked objects can become unreachable as a whole

In-depth knowledge of engines is good when you need low-level optimizations. 
It would be wise to plan that as the next step after you're familiar with the language.

Modern engines implement advanced algorithms of garbage collection.
    see: A tour of V8 Garbage Collection or V8 blog to learn more about the
    V8 internals in general
*/