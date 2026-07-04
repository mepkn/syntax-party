Node.js — pass an encoding to get a string instead of a `Buffer`.

```js
import { readFile } from "node:fs/promises"

const text = await readFile("notes.txt", "utf8")
```
