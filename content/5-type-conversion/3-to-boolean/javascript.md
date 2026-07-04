Falsy values: `undefined`, `null`, `false`, `0`, `NaN`, `""`. Everything else is truthy.

```js
// falsy: false, 0, "", null, undefined, NaN
// truthy: everything else — including [], {} unlike python

Boolean(false)     // false
Boolean(0)         // false
Boolean("")        // false
Boolean(null)      // false
Boolean(undefined) // false
Boolean(NaN)       // false
```
