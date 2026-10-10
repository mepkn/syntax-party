`const` prevents reassignment but does not make objects immutable.

```js
const PI = 3.14159
const MAX_RETRIES = 3

const CONFIG = { debug: false }
CONFIG.debug = true  // allowed — the object contents can still change
```
