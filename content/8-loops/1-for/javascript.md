```js
// C-style
for (let i = 0; i < 5; i++) console.log(i)

// for-of — values
for (const x of ["a", "b"]) console.log(x)

// for-in — keys (objects)
for (const k in obj) console.log(k, obj[k])

// range-like
Array.from({ length: 5 }, (_, i) => i)   // [0,1,2,3,4]
```
