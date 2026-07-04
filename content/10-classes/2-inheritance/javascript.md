Single inheritance with `extends`. A subclass constructor must call `super(...)` before touching `this`.

```js
class Animal {
  constructor(name) { this.name = name }
  speak() { return `${this.name} makes a sound` }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name)                 // required before using `this`
    this.breed = breed
  }
  speak() { return `${this.name} barks` }
}
```
