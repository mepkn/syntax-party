No native mixins — copy methods onto the prototype with `Object.assign`.

```js
const greetable = {
  greet() { return `Hi, I'm ${this.name}` },
}

class User {
  constructor(name) { this.name = name }
}
Object.assign(User.prototype, greetable)

new User("John").greet()   // "Hi, I'm John"
```
