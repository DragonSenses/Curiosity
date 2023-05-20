# Summary | Unicode: flag "u" and class \p{...}

Flag `pattern:u` enables the support of Unicode in regular expressions.

That means two things:

1. Characters of 4 bytes are handled correctly: as a single character, not two 2-byte characters.
2. Unicode properties can be used in the search: `\p{…}`.

With Unicode properties we can look for words in given languages, special characters (quotes, currencies) and so on.

---

# Unicode: flag "u" and class \p{...}

JavaScript uses [Unicode encoding](https://en.wikipedia.org/wiki/Unicode) for strings. Most characters are encoded with 2 bytes, but that allows to represent at most 65536 characters.

That range is not big enough to encode all possible characters, that's why some rare characters are encoded with 4 bytes, for instance like `𝒳` (mathematical X) or `😄` (a smile), some hieroglyphs and so on.

Here are the Unicode values of some characters:

| Character  | Unicode | Bytes count in Unicode  |
|------------|---------|--------|
| a | `0x0061` |  2 |
| ≈ | `0x2248` |  2 |
|𝒳| `0x1d4b3` | 4 |
|𝒴| `0x1d4b4` | 4 |
|😄| `0x1f604` | 4 |

So characters like `a` and `≈` occupy 2 bytes, while codes for `𝒳`, `𝒴` and `😄` are longer, they have 4 bytes.

Long time ago, when JavaScript language was created, Unicode encoding was simpler: there were no 4-byte characters. So, some language features still handle them incorrectly.

For instance, `length` thinks that here are two characters:

```js run
alert('😄'.length); // 2
alert('𝒳'.length); // 2
```

...But we can see that there's only one, right? The point is that `length` treats 4 bytes as two 2-byte characters. That's incorrect, because they must be considered only together (so-called "surrogate pair", see `Strings`).

By default, regular expressions also treat 4-byte "long characters" as a pair of 2-byte ones. And, as it happens with strings, that may lead to odd results. We'll see that a bit later, in `regex-character-sets-and-ranges`.

Unlike strings, regular expressions have flag `pattern:u` that fixes such problems. With such flag, a regexp handles 4-byte characters correctly. And also Unicode property search becomes available, we'll get to it next.

---

## Unicode properties \p{...}

Every character in Unicode has a lot of properties. They describe what "category" the character belongs to, contain miscellaneous information about it.

For instance, if a character has `Letter` property, it means that the character belongs to an alphabet (of any language). And `Number` property means that it's a digit: maybe Arabic or Chinese, and so on.

We can search for characters with a property, written as `pattern:\p{…}`. To use `pattern:\p{…}`, a regular expression must have flag `pattern:u`.

For instance, `\p{Letter}` denotes a letter in any language. We can also use `\p{L}`, as `L` is an alias of `Letter`. There are shorter aliases for almost every property.

In the example below three kinds of letters will be found: English, Georgian and Korean.

```js run
let str = "A ბ ㄱ";

alert( str.match(/\p{L}/gu) ); // A,ბ,ㄱ
alert( str.match(/\p{L}/g) ); // null (no matches, \p doesn't work without the flag "u")
```

Here's the main character categories and their subcategories:

- Letter `L`:
  - lowercase `Ll`
  - modifier `Lm`,
  - titlecase `Lt`,
  - uppercase `Lu`,
  - other `Lo`.
- Number `N`:
  - decimal digit `Nd`,
  - letter number `Nl`,
  - other `No`.
- Punctuation `P`:
  - connector `Pc`,
  - dash `Pd`,
  - initial quote `Pi`,
  - final quote `Pf`,
  - open `Ps`,
  - close `Pe`,
  - other `Po`.
- Mark `M` (accents etc):
  - spacing combining `Mc`,
  - enclosing `Me`,
  - non-spacing `Mn`.
- Symbol `S`:
  - currency `Sc`,
  - modifier `Sk`,
  - math `Sm`,
  - other `So`.
- Separator `Z`:
  - line `Zl`,
  - paragraph `Zp`,
  - space `Zs`.
- Other `C`:
  - control `Cc`,
  - format `Cf`,
  - not assigned `Cn`,
  - private use `Co`,
  - surrogate `Cs`.


So, e.g. if we need letters in lower case, we can write `pattern:\p{Ll}`, punctuation signs: `pattern:\p{P}` and so on.

There are also other derived categories, like:
- `Alphabetic` (`Alpha`), includes Letters `L`, plus letter numbers `Nl` (e.g. Ⅻ - a character for the roman number 12), plus some other symbols `Other_Alphabetic` (`OAlpha`).
- `Hex_Digit` includes hexadecimal digits: `0-9`, `a-f`.
- ...And so on.

Unicode supports many different properties, their full list would require a lot of space, so here are the references:

- List all properties by a character: <https://unicode.org/cldr/utility/character.jsp>.
- List all characters by a property: <https://unicode.org/cldr/utility/list-unicodeset.jsp>.
- Short aliases for properties: <https://www.unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt>.
- A full base of Unicode characters in text format, with all properties, is here: <https://www.unicode.org/Public/UCD/latest/ucd/>.

---

