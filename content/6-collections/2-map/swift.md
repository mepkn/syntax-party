Subscripts return Optionals; assigning `nil` removes the key.

```swift
var user: [String: Any] = ["name": "John", "age": 25]

user["name"]               // Optional("John")
user["email"]              // nil if missing
user["email"] = "a@b.c"    // add
user["age"] = nil          // remove

user.keys                  // ["name", "email"]
user.values                // ["John", 25]

for (k, v) in user { print(k, v) }
```
