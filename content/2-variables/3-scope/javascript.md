`let` and `const` are block-scoped. Avoid `var` — it is function-scoped and hoisted.

```js
// Local → Outer → Global
// Direct Mutation

let x = "global"

function outer() {
  let x = "outer"

  function inner() {
    x = "modified by inner"   // directly modifies outer scope
    console.log(x)            // outer (modified)
  }

  inner()
  console.log(x)              // outer (modified)
}

outer()
console.log(x)                // global (unchanged)
```
