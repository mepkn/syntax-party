```js
function getAge(user) {
  if (!user) throw new Error("user required")
  return user.age
}

// custom error class
class ValidationError extends Error {}
throw new ValidationError("bad input")
```
