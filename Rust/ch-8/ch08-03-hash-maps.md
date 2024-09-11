## Storing Keys with Associated Values in Hash Maps

#### Introduction to Hash Maps

The last of our common collections is the *hash map*. The type `HashMap<K, V>` stores a mapping of keys of type `K` to values of type `V` using a *hashing function*, which determines how it places these keys and values into memory. Many programming languages support this kind of data structure, but they often use different names, such as *hash*, *map*, *object*, *hash table*, *dictionary*, or *associative array*.

#### Use Cases

Hash maps are useful when you want to look up data not by using an index, as you can with vectors, but by using a key that can be of any type. For example, in a game, you could keep track of each team's score in a hash map where each key is a team's name and the values are each team's score. Given a team name, you can retrieve its score.

#### Basic API

We'll go over the basic API of hash maps in this section, but many more functionalities are available in the functions defined on `HashMap<K, V>` by the standard library. As always, check the standard library documentation for more information.
