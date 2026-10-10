`await` pauses only inside `async` functions. Errors flow through `try/catch` naturally.

```js
async function getUser(id) {
  try {
    const user = await loadUser(id)
    console.log(user)
  } catch (err) {
    console.error(err)
  }
}

getUser(1)
```
