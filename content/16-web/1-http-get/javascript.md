`fetch` returns a Promise resolving to a `Response`. Call `.json()` (also async) to parse the body.

```js
// async/await
const res = await fetch("https://api.example.com/users")
const data = await res.json()

// or Promise chain
fetch("https://api.example.com/users")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err))
```
