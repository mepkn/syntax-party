Plain objects work as maps with string keys. For arbitrary keys, use `Map`.

```js
const user = { name: "John", age: 25 }

user.name                  // "John"
user["age"]                // 25
user.email = "a@b.c"       // add
delete user.age            // remove

Object.keys(user)          // ["name", "email"]
Object.values(user)        // ['John', 25]
Object.entries(user)       // [["name","John"], ...]

for (const [k, v] of Object.entries(user)) console.log(k, v)
```
