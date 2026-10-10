Maps have typed keys and values. Read with the two-value form to detect missing keys.

```go
user := map[string]any{
    "name": "John",
    "age":  25,
}

user["name"]                       // "John"
v, ok := user["age"]               // ok == false when absent
user["email"] = "a@b.c"            // add
delete(user, "age")                // remove

slices.Collect(maps.Keys(user))    // keys   (Go 1.23+)
slices.Collect(maps.Values(user))  // values

for k, v := range user {           // iteration order is randomized
    fmt.Println(k, v)
}
```
