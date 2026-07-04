Node.js — the promise-based `fs` API is the modern default.

```js
import { readFile, writeFile } from "node:fs/promises"

const text = await readFile("notes.txt", "utf8")

await writeFile("notes.txt", "hello\n")
await writeFile("notes.txt", "more\n", { flag: "a" })  // append
```
