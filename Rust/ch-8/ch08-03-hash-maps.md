## Storing Keys with Associated Values in Hash Maps

#### Introduction to Hash Maps

The last of our common collections is the *hash map*. The type `HashMap<K, V>` stores a mapping of keys of type `K` to values of type `V` using a *hashing function*, which determines how it places these keys and values into memory. Many programming languages support this kind of data structure, but they often use different names, such as *hash*, *map*, *object*, *hash table*, *dictionary*, or *associative array*.

#### Use Cases

Hash maps are useful when you want to look up data not by using an index, as you can with vectors, but by using a key that can be of any type. For example, in a game, you could keep track of each team's score in a hash map where each key is a team's name and the values are each team's score. Given a team name, you can retrieve its score.

#### Basic API

We'll go over the basic API of hash maps in this section, but many more functionalities are available in the functions defined on `HashMap<K, V>` by the standard library. As always, check the standard library documentation for more information.

### Creating a New Hash Map

#### Initializing a Hash Map

One way to create an empty hash map is to use `new` and to add elements with `insert`. In the example below, we're keeping track of the scores of two teams, *Blue* and *Yellow*. The Blue team starts with 10 points, and the Yellow team starts with 50.

```rust
use std::collections::HashMap;

let mut scores = HashMap::new();

scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);
```

#### Importing HashMap

Note that we need to first `use` the `HashMap` from the collections portion of the standard library. Of our three common collections, this one is the least often used, so it's not included in the features brought into scope automatically in the prelude. Hash maps also have less support from the standard library; there's no built-in macro to construct them, for example.

#### Memory Storage and Homogeneity

Just like vectors, hash maps store their data on the heap. This `HashMap` has keys of type `String` and values of type `i32`. Like vectors, hash maps are homogeneous: all of the keys must have the same type, and all of the values must have the same type.
