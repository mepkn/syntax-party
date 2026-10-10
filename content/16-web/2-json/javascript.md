```js
// parse
const obj = JSON.parse('{"name":"John","age":25}')
obj.name               // "John"

// stringify
JSON.stringify({ name: "John", age: 25 })
JSON.stringify(obj, null, 2)   // pretty-print with 2-space indent
```
