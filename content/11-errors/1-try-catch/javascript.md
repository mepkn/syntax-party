```js
try {
  riskyOp()
} catch (err) {
  console.error(err.message)
} finally {
  cleanup()
}
```
