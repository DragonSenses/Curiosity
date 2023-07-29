# Template Literal Types

Template literal types build on string literal types, and have the ability to expand into many strings via unions.

They have the same syntax as template literal strings in JavaScript, but are used in type positions. When used with concrete literal types, a template literal produces a new string literal type by concatenating the contents.