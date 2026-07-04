Arrays are value types — assignment copies. `$0` is the implicit closure parameter.

```swift
var xs = ["apple", "banana", "cherry"]

xs.count                   // 3
xs[0]                      // "apple"
xs.append("date")          // append
xs.removeLast()            // remove & return last
xs[1..<3]                  // ["banana", "cherry"]

xs.map { $0.uppercased() }
xs.filter { $0.count > 5 }

for x in xs { print(x) }
```
