No implicit fallthrough — each case breaks automatically. Commas stack values.

```go
switch day {
case "mon", "tue":
    fmt.Println("early week")
case "fri":
    fmt.Println("tgif")
default:
    fmt.Println("other")
}

// expression-less switch — cleaner if/else-if chain
switch {
case age >= 18:
    fmt.Println("adult")
case age >= 13:
    fmt.Println("teen")
default:
    fmt.Println("child")
}


```
