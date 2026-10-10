Browser has `prompt`; Node.js uses the `readline` module.

```js
// browser
const name = prompt("Enter your name")

// Node.js
import readline from "node:readline/promises"
import { stdin, stdout } from "node:process"

const rl = readline.createInterface({ input: stdin, output: stdout })
const name = await rl.question("Enter your name: ")
rl.close()
```
