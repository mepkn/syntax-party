Closures capture outer variables by reference — mutation is visible in the enclosing scope.

```swift
var x = "global"

func outer() {
    var x = "enclosing"

    let inner = {
        x = "modified by inner"   // closures capture by reference
        print(x)                  // enclosing (modified)
    }

    inner()
    print(x)                      // enclosing (modified)
}
```
