JavaScript has a single `number` type (64-bit float). `BigInt` handles integers beyond 2⁵³−1.

```js
let integer    = 42
let float      = 3.14
let scientific = 1.5e10
let hex        = 0xFF
let big        = 9007199254740991n   // BigInt literal

10 / 3         // 3.3333... — no integer division
10 % 3         // 1
2 ** 10        // 1024
Math.floor(3.7)  // 3
Math.round(3.5)  // 4
```
