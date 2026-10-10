`null` is intentional absence; `undefined` is uninitialized or missing.

```js
let a           // undefined — declared but not assigned
let b = null    // null — explicitly "no value"

a === undefined // true
b === null      // true
a == null       // true  — both null and undefined pass loose equality

// safe access
const name = user?.name ?? "Guest"
```
