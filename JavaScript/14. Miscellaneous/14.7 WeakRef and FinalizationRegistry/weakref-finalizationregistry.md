# Summary | WeakRef and FinalizationRegistry

`WeakRef` - designed to create weak references to objects, allowing them to be deleted from memory by the garbage collector if there are no longer strong references to them.
This is beneficial for addressing excessive memory usage and optimizing the utilization of system resources in applications.

`FinalizationRegistry` - is a tool for registering callbacks, that are executed when objects that are no longer strongly referenced, are destroyed.
This allows releasing resources associated with the object or performing other necessary operations before deleting the object from memory.

#### **Warning** "hidden" features of the language

This article covers a very narrowly focused topic, that most developers extremely rarely encounter in practice (and may not even be aware of its existence).  

We recommend skipping this chapter if you have just started learning JavaScript.

