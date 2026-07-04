`union` / `intersect` / `subtract` read as infix functions.

```kotlin
val s = mutableSetOf("apple", "banana", "apple")

s.size                 // 2 — duplicates collapsed
"apple" in s           // true
s.add("cherry")
s.remove("banana")

s1 union s2            // union
s1 intersect s2        // intersection
s1 subtract s2         // difference

for (x in s) println(x)
```
