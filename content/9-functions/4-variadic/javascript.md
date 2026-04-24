`...` is rest when collecting, spread when expanding.

```js
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0)
}

sum(1, 2, 3)     // 6

// spread an array into arguments
const xs = [1, 2, 3]
sum(...xs)       // 6
```
