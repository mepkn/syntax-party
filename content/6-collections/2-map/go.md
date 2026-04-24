Maps have typed keys and values. Read with the two-value form to detect missing keys.

```go
user := map[string]any{
    "name": "John",
    "age":  25,
}

user["name"]                // "John"
user["email"] = "a@b.c"     // add
delete(user, "age")         // remove

v, ok := user["missing"]    // ok == false when absent

for k, v := range user {
    fmt.Println(k, v)
}
```
