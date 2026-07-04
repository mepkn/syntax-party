```js
Number("42")       // 42
Number("3.14")     // 3.14
Number("42px")     // NaN
parseInt("42px", 10)   // 42 — parses leading digits; always pass the radix
```
