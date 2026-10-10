`Int...` arrives as an array inside the function; Swift has no spread operator.

```swift
func sumAll(_ nums: Int...) -> Int {
    nums.reduce(0, +)
}

sumAll(1, 2, 3)   // 6

// no spread — offer an overload that takes an array
```
