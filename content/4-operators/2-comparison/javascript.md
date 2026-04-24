Prefer `===` / `!==` — `==` coerces types and is a frequent source of bugs.

```js
1 == "1"    // true   — loose equality (coerces)
1 === "1"   // false  — strict equality (preferred)
1 !== 2     // true
2 > 1       // true
2 >= 2      // true
```
