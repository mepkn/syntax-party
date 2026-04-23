```js
let yes = true
let no  = false

// falsy: false, 0, "", null, undefined, NaN
// truthy: everything else — including [], {}

Boolean(0)         // false
Boolean("")        // false
Boolean([])        // true  — empty array is truthy (unlike Python)
Boolean({})        // true  — empty object is truthy (unlike Python)

!true              // false
true && false      // false
true || false      // true
```
