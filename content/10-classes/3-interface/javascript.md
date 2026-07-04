No interface construct — duck typing rules. TypeScript adds `interface` for static checks.

```js
// any object with .speak() works
function announce(speaker) {
  console.log(speaker.speak())
}

announce(new Dog("Rex"))
announce({ speak: () => "beep" })   // plain object works too
```
