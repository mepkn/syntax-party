Defaults are re-evaluated on every call — a mutable default like `[]` is safe here (unlike Python).

```js
function greet(name, msg = "Hello") {
  return `${msg}, ${name}!`
}

greet("John")          // "Hello, John!"
greet("John", "Hi")    // "Hi, John!"
```
