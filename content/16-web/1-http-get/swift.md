`URLSession` is built in and async/await-native.

```swift
let url = URL(string: "https://api.example.com/users")!
let (data, _) = try await URLSession.shared.data(from: url)
let users = try JSONDecoder().decode([User].self, from: data)
```
