```swift
var s: Set = ["apple", "banana", "apple"]

s.count                // 2 — duplicates collapsed
s.contains("apple")    // true
s.insert("cherry")
s.remove("banana")

s1.union(s2)           // union
s1.intersection(s2)    // intersection
s1.subtracting(s2)     // difference

for x in s { print(x) }
```
