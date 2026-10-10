`break` and `continue` accept a label to target an outer loop.

```js
for (const x of xs) {
  if (x === "skip") continue  // skip this iteration
  if (x === "stop") break     // exit the loop
  console.log(x)
}
```
