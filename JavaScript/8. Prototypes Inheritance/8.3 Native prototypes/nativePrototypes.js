/* Native prototypes */
/* Summary
- All built-in objects follow the same pattern:
  - The methods are stored in the prototype (Array.prototype, Object.prototype, 
    Date.prototype, etc.)
  - The object itself stores only the data (array items, object properties, 
    the date)

- Primitives also store methods in prototypes of wrapper objects: 
Number.prototype, String.prototype and Boolean.prototype. 
Only undefined and null do not have wrapper objects

- Built-in prototypes can be modified or populated with new methods. 
But it’s not recommended to change them. The only allowable case is probably 
when we add-in a new standard, but it’s not yet supported by the JavaScript engine
*/