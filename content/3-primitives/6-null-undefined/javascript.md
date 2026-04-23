`null` is intentional absence; `undefined` is uninitialized or missing.

```js
let a           // undefined — declared but not assigned
let b = null    // null — explicitly "no value"

typeof undefined   // "undefined"
typeof null        // "object"  — historical quirk; check with === null

a == null   // true  — both null and undefined pass loose equality
a === null  // false — strict: undefined ≠ null
b === null  // true

// safe access
const name = user?.profile?.name ?? "Guest"
```
