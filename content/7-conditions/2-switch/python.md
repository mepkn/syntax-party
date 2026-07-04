No fallthrough — each case breaks automatically.

```python
match day:
    case "mon" | "tue":
        print("early week")
    case "fri":
        print("tgif")
    case _:
        print("other")
```
