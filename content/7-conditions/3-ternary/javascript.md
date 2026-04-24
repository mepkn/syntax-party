```js
const label = age >= 18 ? "adult" : "minor"

// fallback shortcuts
const name  = user.name || "Guest"   // any falsy
const name2 = user.name ?? "Guest"   // null / undefined only
```
