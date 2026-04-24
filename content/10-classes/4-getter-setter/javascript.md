`get`/`set` create a property accessor — read/write without parens. `#` makes a true private field.

```js
class User {
  #name
  constructor(name) { this.#name = name }

  get name()  { return this.#name }
  set name(v) { this.#name = v.trim() }
}

const u = new User("John")
u.name              // "John"
u.name = "  Jane  "
```
