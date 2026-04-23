`let` and `const` are block-scoped. Avoid `var` — it is function-scoped and hoisted.

```js
let global = "global"

function myFunc() {
  let funcScoped = "function"

  {
    let blockScoped = "block"
    console.log(blockScoped)  // accessible here
  }
  // blockScoped not accessible here
}
```
