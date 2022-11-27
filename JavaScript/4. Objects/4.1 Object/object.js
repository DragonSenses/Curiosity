/* Objects Summary
Objects are associate arrays with several special features.

    They store properties (key-value pairs), where:
    - Property keys must be strings or symbols (usually strings).
    - Values can be of any type.

    To access a property, we can use:
    - The dot notation: obj.property.
    - Square brackets notation obj["property"]. Square brackets allow 
      taking the key from a variable, like obj[varWithKey].

    Additional operators:
    - To delete a property: delete obj.prop.
    - To check if a property with the given key exists: "key" in obj.
    - To iterate over an object: for (let key in obj) loop.

What we've studied so far is called a "plain object", or just Object.

There are many other kinds of objects in JavaScript:
  - Array to store ordered data collections,
  - Date to store the information about the date and time,
  - Error to store the information about an error.

They have their special features. Some call them "Array type" or "Date type",
but formally they are not types of their own, but belong to a single "object" 
data type. And they extend it in various ways. 
*/