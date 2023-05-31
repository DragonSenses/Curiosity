# Summary | Escaping, special characters

- To search for special characters `pattern:[ \ ^ $ . | ? * + ( )` literally, we need to prepend them with a backslash `\` ("escape them").
- We also need to escape `/` if we're inside `pattern:/.../` (but not inside `new RegExp`).
- When passing a string to `new RegExp`, we need to double backslashes `\\`, cause string quotes consume one of them.

---

