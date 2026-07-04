Falsy: `false`, `0`, `""`, `null`, `undefined`, `NaN`. Everything else is truthy.

```js
Boolean(0)         // false
Boolean("")        // false
Boolean("hi")      // true
Boolean([])        // true — empty array is truthy (unlike Python)
!!"hi"             // true — double-negation shorthand
```
