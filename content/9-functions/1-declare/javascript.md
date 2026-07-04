Function declarations are hoisted — callable before they appear in the file.

```js
function add(a, b) {
  return a + b
}

add(2, 3)   // 5
```
