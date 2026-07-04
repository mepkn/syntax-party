```js
const s = "  Hello, World!  "

s.length                    // 17
s.trim()                    // "Hello, World!"
s.toUpperCase()             // "  HELLO, WORLD!  "
s.toLowerCase()             // "  hello, world!  "
s[0]                        // " "
s.slice(2, 7)               // "Hello"
s.includes("World")         // true
s.replace("World", "JS")    // "  Hello, JS!  "
s.split(", ")               // ["  Hello", "World!  "]
```
