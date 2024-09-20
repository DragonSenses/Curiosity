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
   - Ignore the new value and keep the old value, only adding the new value if the key doesn't already have a value.

3. **Combine Values**
   - Combine the old value and the new value in some way.

Let's look at how to implement each of these approaches!

#### Overwriting a Value

##### Inserting a Key-Value Pair

If we insert a key and a value into a hash map and then insert that same key with a different value, the value associated with that key will be replaced. 

##### Example: Replacing a Value

Even though the code in Listing 8-23 calls `insert` twice, the hash map will only contain one key-value pair because we're inserting the value for the Blue team's key both times.

```rust
  use std::collections::HashMap;

  let mut scores = HashMap::new();

  scores.insert(String::from("Blue"), 10);
  scores.insert(String::from("Blue"), 25);

  println!("{scores:?}");
```

<span class="caption">Listing 8-23: Replacing a value stored with a particular key</span>

##### Output

This code will print `{"Blue": 25}`. The original value of `10` has been overwritten.

#### Adding a Key and Value Only If a Key Isn't Present

##### Checking for Existing Keys

It's common to check whether a particular key already exists in the hash map with a value and then take the following actions:
- If the key exists, the existing value should remain the way it is.
- If the key doesn't exist, insert it along with a value.

##### Using the `entry` API

Hash maps have a special API called `entry` that takes the key you want to check as a parameter. The return value of the `entry` method is an enum called `Entry` that represents a value that might or might not exist.

##### Example: Using `entry` to Insert Values

Let's say we want to check whether the key for the Yellow team has a value associated with it. If it doesn't, we want to insert the value `50`, and do the same for the Blue team. Using the `entry` API, the code looks like Listing 8-24.

```rust
use std::collections::HashMap;

let mut scores = HashMap::new();
scores.insert(String::from("Blue"), 10);

scores.entry(String::from("Yellow")).or_insert(50);
scores.entry(String::from("Blue")).or_insert(50);

println!("{scores:?}");
```

<span class="caption">Listing 8-24: Using the `entry` method to only insert if the key does not already have a value</span>

##### How `or_insert` Works

The `or_insert` method on `Entry` returns a mutable reference to the value for the corresponding `Entry` key if that key exists. If the key does not exist, it inserts the parameter as the new value for this key and returns a mutable reference to the new value. This technique is much cleaner than writing the logic ourselves and works well with the borrow checker.

##### Output

Running the code in Listing 8-24 will print `{"Yellow": 50, "Blue": 10}`. The first call to `entry` will insert the key for the Yellow team with the value `50` because the Yellow team doesn't have a value already. The second call to `entry` will not change the hash map because the Blue team already has the value `10`.

#### Updating a Value Based on the Old Value

##### Use Case

A common use case for hash maps is to look up a key's value and then update it based on the old value. For instance, you might want to count how many times each word appears in some text.

##### Example: Counting Word Occurrences

Listing 8-25 shows code that counts how many times each word appears in some text. We use a hash map with the words as keys and increment the value to keep track of how many times we've seen that word. If it's the first time we've seen a word, we'll first insert the value `0`.

```rust
use std::collections::HashMap;

let text = "hello world wonderful world";

let mut map = HashMap::new();

for word in text.split_whitespace() {
    let count = map.entry(word).or_insert(0);
    *count += 1;
}

println!("{map:?}");
```

<span class="caption">Listing 8-25: Counting occurrences of words using a hash map that stores words and counts</span>

##### Output

This code will print `{"world": 2, "hello": 1, "wonderful": 1}`. You might see the same key-value pairs printed in a different order because iterating over a hash map happens in an arbitrary order.

##### Explanation

- The `split_whitespace` method returns an iterator over subslices, separated by whitespace, of the value in `text`.
- The `or_insert` method returns a mutable reference (`&mut V`) to the value for the specified key. If the key does not exist, it inserts the parameter as the new value for this key and returns a mutable reference to the new value.
- We store that mutable reference in the `count` variable. To assign to that value, we must first dereference `count` using the asterisk (`*`).
- The mutable reference goes out of scope at the end of the `for` loop, so all of these changes are safe and allowed by the borrowing rules.

### Hashing Functions

#### Default Hashing Function

By default, `HashMap` uses a hashing function called *SipHash* that provides resistance to denial-of-service (DoS) attacks involving hash tables. For more details, see [SipHash](https://en.wikipedia.org/wiki/SipHash).

#### Performance Trade-off

While SipHash is not the fastest hashing algorithm available, the trade-off for better security is considered worth the drop in performance.

#### Custom Hashing Functions

If you profile your code and find that the default hash function is too slow for your purposes, you can switch to another function by specifying a different hasher.

##### Implementing a Hasher

A *hasher* is a type that implements the `BuildHasher` trait. We'll discuss traits and how to implement them in [Chapter 10](https://doc.rust-lang.org/book/ch10-02-traits.html).

##### Using Existing Hashers

You don't necessarily have to implement your own hasher from scratch. [crates.io](https://crates.io/) has libraries shared by other Rust users that provide hashers implementing many common hashing algorithms.
