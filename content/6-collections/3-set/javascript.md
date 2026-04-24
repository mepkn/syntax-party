```js
const s = new Set(["apple", "banana", "apple"])

s.size                   // 2 — duplicates collapsed
s.has("apple")           // true
s.add("cherry")
s.delete("banana")

for (const x of s) console.log(x)

// union / intersection via spread
new Set([...s1, ...s2])
new Set([...s1].filter(x => s2.has(x)))
```
