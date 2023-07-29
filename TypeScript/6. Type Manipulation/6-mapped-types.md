# Mapped Types

When you don’t want to repeat yourself, sometimes a type needs to be based on another type.

Mapped types build on the syntax for index signatures, which are used to declare the types of properties which have not been declared ahead of time:

```ts
type OnlyBoolsAndHorses = {
  [key: string]: boolean | Horse;
};
 
const conforms: OnlyBoolsAndHorses = {
  del: true,
  rodney: false,
};
```

A mapped type is a generic type which uses a union of `PropertyKey`s (frequently created [via a keyof](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)) to iterate through keys to create a type:

```ts
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};
```

In this example, `OptionsFlags` will take all the properties from the type Type and change their values to be a boolean.

```ts
type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
};
 
type FeatureOptions = OptionsFlags<Features>;
           
/* type FeatureOptions = {
    darkMode: boolean;
    newUserProfile: boolean;
} */
```

## Mapping Modifiers

There are two additional modifiers which can be applied during mapping: `readonly` and `?` which affect mutability and optionality respectively.

You can remove or add these modifiers by prefixing with `-` or `+`. If you don’t add a prefix, then `+` is assumed.

