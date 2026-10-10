```js
const xs = ["apple", "banana", "cherry"]

xs.length                  // 3
xs[0]                      // "apple"
xs.push("date")            // append
xs.pop()                   // remove & return last
xs.slice(1, 3)             // ["banana", "cherry"]

xs.map(x => x.toUpperCase())
xs.filter(x => x.length > 5)

for (const x of xs) console.log(x)
```
