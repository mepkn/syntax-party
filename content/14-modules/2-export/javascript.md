One `default` per file; any number of named exports.

```js
// named exports
export function add(a, b) { return a + b }
export const PI = 3.14

// default — one per file
export default class Calculator {}

// re-export
export { add } from "./math.js"
```
