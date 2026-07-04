`&&` and `||` return one of their operands, not a boolean.

```js
true && false      // false  (AND)
true || false      // true   (OR)
!true              // false  (NOT)

"" || "fallback"   // "fallback" — any falsy value triggers ||
null ?? "default"  // "default" — only null/undefined trigger ??
```
