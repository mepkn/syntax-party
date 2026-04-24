```js
class User {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  greet() {
    return `Hi, I'm ${this.name}`
  }
}

const u = new User("John", 25)
u.greet()
```
