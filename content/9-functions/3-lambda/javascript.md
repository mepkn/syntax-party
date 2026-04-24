Arrow functions close over `this` from the surrounding scope.

```js
const square = x => x * x

// expression body — implicit return
[1, 2, 3].map(x => x * 2)

// multi-statement body needs braces + explicit return
const add = (a, b) => {
  const sum = a + b
  return sum
}
```
