ES modules. Named, default, and namespace imports are distinct forms.

```js
// named
import { add, sub } from "./math.js"

// default
import math from "./math.js"

// namespace
import * as math from "./math.js"

// dynamic — returns a Promise
const mod = await import("./math.js")
```
