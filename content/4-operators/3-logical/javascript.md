```js
true && false    // false  (AND)
true || false    // true   (OR)
!true            // false  (NOT)

// short-circuit
user && user.name       // safe access
name || "Guest"         // fallback on any falsy
name ?? "Guest"         // fallback only on null/undefined
```
