Single inheritance with `extends`. Call `super(...)` first in the subclass constructor.

```js
class Animal {
  constructor(name) { this.name = name }
  speak() { return `${this.name} makes a sound` }
}

class Dog extends Animal {
  speak() { return `${this.name} barks` }
}
```
