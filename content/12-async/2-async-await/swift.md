`async` in the signature, `await` at the call — `try` joins it for throwing calls.

```swift
func getUser(id: Int) async {
    do {
        let user = try await loadUser(id: id)
        print(user)
    } catch {
        print(error)
    }
}

await getUser(id: 1)
```
