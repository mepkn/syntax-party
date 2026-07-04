No ownership — assignment copies a reference, and the GC frees unreachable objects.

```js
const a = ["x"]
const b = a          // same array — reference copy
b.push("y")
a                    // ["x", "y"]

const c = [...a]     // shallow copy
```
