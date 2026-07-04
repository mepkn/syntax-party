`Promise.all` fails fast on the first rejection; `Promise.allSettled` always waits for every result.

```js
const [a, b] = await Promise.all([loadUser(1), loadUser(2)])

const results = await Promise.allSettled([loadUser(1), loadUser(-1)])
// [{ status: "fulfilled", value: ... }, { status: "rejected", reason: ... }]
```
