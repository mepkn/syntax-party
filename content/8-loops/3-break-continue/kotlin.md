Labels (`outer@`) target outer loops; inside lambdas use qualified `return@forEach`.

```kotlin
for (x in xs) {
    if (x == "skip") continue
    if (x == "stop") break
    println(x)
}
```
