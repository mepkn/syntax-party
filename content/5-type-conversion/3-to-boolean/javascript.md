Falsy values: `undefined`, `null`, `false`, `0`, `NaN`, `""`. Everything else is truthy.

```js
Boolean(1)     // true
Boolean(0)     // false
Boolean("")    // false
Boolean("x")   // true
!!value        // shorthand for Boolean(value)
```
