Defaults are evaluated at call time, so closures over outer state work as expected.

```js
function greet(name, msg = "Hello") {
  return `${msg}, ${name}!`
}

greet("John")          // "Hello, John!"
greet("John", "Hi")    // "Hi, John!"
```
