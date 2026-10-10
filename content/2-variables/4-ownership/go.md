Values copy on assignment, but slices and maps share backing storage. The GC frees the rest.

```go
a := []string{"x"}
b := a               // copies the slice header — shared backing array
b[0] = "y"
a[0]                 // "y"

c := slices.Clone(a) // explicit copy
```
