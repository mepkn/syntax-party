Cases fall through until a `break` — easy to forget. Stack cases to match multiple values.

```js
switch (day) {
  case "mon":
  case "tue":
    console.log("early week")
    break
  case "fri":
    console.log("tgif")
    break
  default:
    console.log("other")
}
```
