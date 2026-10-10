`Promise` wraps an eventual value. Chain with `.then` / `.catch` / `.finally`.

```js
function loadUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) resolve({ id, name: "John" })
      else reject(new Error("bad id"))
    }, 100)
  })
}

loadUser(1)
  .then(user => console.log(user))
  .catch(err => console.error(err))
  .finally(() => console.log("done"))
```
