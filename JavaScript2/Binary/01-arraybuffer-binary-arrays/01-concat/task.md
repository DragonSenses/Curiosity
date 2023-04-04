# Concatenate typed arrays

Given an array of `Uint8Array`, write a function `concat(arrays)` that returns a concatenation of them into a single array.

```js
function concat(arrays) {
  // ...your code...
}

let chunks = [
  new Uint8Array([0, 1, 2]),
  new Uint8Array([3, 4, 5]),
  new Uint8Array([6, 7, 8])
];

console.log(Array.from(concat(chunks))); // 0, 1, 2, 3, 4, 5, 6, 7, 8

console.log(concat(chunks).constructor.name); // Uint8Array
```

---

## Answer:

```js
function concat(arrays) {
  // sum of individual array lengths
  let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);

  let result = new Uint8Array(totalLength);
  
  if (!arrays.length) return result;

  // for each array - copy it over result
  // next array is copied right after the previous one
  let length = 0;
  for(let array of arrays) {
    result.set(array, length);
    length += array.length;
  }

  return result;
}
```

### Test:

```js
describe("concat", function() {
  let chunks = [
    new Uint8Array([0, 1, 2]),
    new Uint8Array([3, 4, 5]),
    new Uint8Array([6, 7, 8])
  ];

  it("result has the same array type", function() {

    let result = concat(chunks);

    assert.equal(result.constructor, Uint8Array);
  });

  it("concatenates arrays", function() {

    let result = concat(chunks);

    assert.deepEqual(result, new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8]));

  });

  it("returns empty array on empty input", function() {

    let result = concat([]);

    assert.equal(result.length, 0);

  });

});
```