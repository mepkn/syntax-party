```js
import { writeFile, appendFile } from "node:fs/promises"

await writeFile("notes.txt", "hello\n")   // create or overwrite
await appendFile("notes.txt", "more\n")   // append
```
