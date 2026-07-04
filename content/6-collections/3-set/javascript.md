```js
const s = new Set(["apple", "banana", "apple"])

s.size                   // 2 — duplicates collapsed
s.has("apple")           // true
s.add("cherry")
s.delete("banana")

s1.union(s2)             // union
s1.intersection(s2).     // intersection
s1.difference(s2)        // difference

for (const x of s) console.log(x)
```
