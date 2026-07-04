Maps have typed keys and values. Read with the two-value form to detect missing keys.

```go
user := map[string]any{
    "name": "John",
    "age":  25,
}

user["name"]                // "John"
v, ok := user["age"]        // 25 (ok == false when absent)
user["email"] = "a@b.c"     // add
delete(user, "age")         // remove

var keys []string
for k := range user {
    keys = append(keys, k)
}
var values []interface{}
for _, v := range user {
    values = append(values, v)
}
type Pair struct {
    Key   string
    Value interface{}
}
var entries []Pair
for k, v := range user {
    entries = append(entries, Pair{k, v})
}

for k, v := range user {
    fmt.Println(k, v)
}
```
