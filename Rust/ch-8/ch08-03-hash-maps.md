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

<span class="caption">Listing 8-20: Creating a new hash map and inserting some keys and values</span>

#### Importing HashMap

Note that we need to first `use` the `HashMap` from the collections portion of the standard library. Of our three common collections, this one is the least often used, so it's not included in the features brought into scope automatically in the prelude. Hash maps also have less support from the standard library; there's no built-in macro to construct them, for example.

#### Memory Storage and Homogeneity

Just like vectors, hash maps store their data on the heap. This `HashMap` has keys of type `String` and values of type `i32`. Like vectors, hash maps are homogeneous: all of the keys must have the same type, and all of the values must have the same type.

### Accessing Values in a Hash Map

#### Retrieving Values

We can get a value out of the hash map by providing its key to the `get` method, as shown below:

```rust
use std::collections::HashMap;

let mut scores = HashMap::new();

scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);

let team_name = String::from("Blue");
let score = scores.get(&team_name).copied().unwrap_or(0);
```

<span class="caption">Listing 8-21: Accessing the score for the Blue team stored in the hash map</span>

Here, `score` will have the value that's associated with the Blue team, and the result will be `10`. The `get` method returns an `Option<&V>`; if there's no value for that key in the hash map, `get` will return `None`. This program handles the `Option` by calling `copied` to get an `Option<i32>` rather than an `Option<&i32>`, then `unwrap_or` to set `score` to zero if `scores` doesn't have an entry for the key.

#### Iterating Over Key-Value Pairs

We can iterate over each key–value pair in a hash map in a similar manner as we do with vectors, using a `for` loop:

```rust
use std::collections::HashMap;

let mut scores = HashMap::new();

scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);

for (key, value) in &scores {
    println!("{key}: {value}");
}
```

This code will print each pair in an arbitrary order:

```text
Yellow: 50
Blue: 10
```

### Hash Maps and Ownership

#### Copy Trait and Hash Maps

For types that implement the `Copy` trait, like `i32`, the values are copied into the hash map.

#### Owned Values and Hash Maps

For owned values like `String`, the values will be moved and the hash map will be the owner of those values, as demonstrated in Listing 8-22.

```rust
use std::collections::HashMap;

let field_name = String::from("Favorite color");
let field_value = String::from("Blue");

let mut map = HashMap::new();
map.insert(field_name, field_value);
// field_name and field_value are invalid at this point, try using them and
// see what compiler error you get!
```

<span class="caption">Listing 8-22: Showing that keys and values are owned by the hash map once they're inserted</span>

We aren't able to use the variables `field_name` and `field_value` after they've been moved into the hash map with the call to `insert`.

When you insert owned values like `String` into the hash map, those values are moved into the hash map, and the hash map takes ownership of them. This means that after the insertion, the original variables (`field_name` and `field_value`) are no longer valid and cannot be used.

Here's a quick recap of the key points:

- **Copy Trait**: For types that implement the `Copy` trait (e.g., `i32`), values are copied into the hash map.
- **Owned Values**: For owned types like `String`, values are moved into the hash map, and the hash map becomes the owner.
- **References**: If you insert references into the hash map, the original values must remain valid for as long as the hash map is valid.

#### References and Hash Maps

If we insert references to values into the hash map, the values won't be moved into the hash map. The values that the references point to must be valid for at least as long as the hash map is valid.

We'll talk more about these issues in the ["Validating References with Lifetimes"]([#](https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html#validating-references-with-lifetimes)) section in Chapter 10.

### Updating a Hash Map

#### Unique Key-Value Association

Although the number of key-value pairs in a hash map is growable, each unique key can only have one value associated with it at a time. However, multiple keys can have the same value. For example, both the Blue team and the Yellow team could have the value `10` stored in the `scores` hash map.

#### Handling Existing Keys

When updating a hash map, you need to decide how to handle cases where a key already has an associated value. Here are the options:

1. **Replace the Old Value**
   - Replace the old value with the new value, completely disregarding the old value.

2. **Keep the Old Value**
   - Ignore the new value and keep the old value, only adding the new value if the key doesn’t already have a value.

3. **Combine Values**
   - Combine the old value and the new value in some way.

Let's look at how to implement each of these approaches!
