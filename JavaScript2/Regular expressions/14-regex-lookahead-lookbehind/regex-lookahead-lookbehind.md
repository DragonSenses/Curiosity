## Summary | Lookahead & lookbehind

Lookahead and lookbehind (commonly referred to as "lookaround") are useful when we'd like to match something depending on the context before/after it.

For simple regexps we can do the similar thing manually. That is: match everything, in any context, and then filter by context in the loop.

Remember, `str.match` (without flag `pattern:g`) and `str.matchAll` (always) return matches as arrays with `index` property, so we know where exactly in the text it is, and can check the context.

But generally lookaround is more convenient.

Lookaround types:

| Pattern            | type             | matches |
|--------------------|------------------|---------|
| `X(?=Y)`   | Positive lookahead | `pattern:X` if followed by `pattern:Y` |
| `X(?!Y)`   | Negative lookahead | `pattern:X` if not followed by `pattern:Y` |
| `(?<=Y)X` |  Positive lookbehind | `pattern:X` if after `pattern:Y` |
| `(?<!Y)X` | Negative lookbehind | `pattern:X` if not after `pattern:Y` |