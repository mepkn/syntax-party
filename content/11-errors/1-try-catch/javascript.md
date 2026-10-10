Any value can be thrown and caught — not just `Error` objects.

```js
try {
  riskyOp()
} catch (err) {
  console.error(err.message)
} finally {
  cleanup()
}
```
