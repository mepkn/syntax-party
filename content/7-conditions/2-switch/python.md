`match` is structural — supports patterns, guards, and destructuring. Python 3.10+.

```python
match day:
    case "mon" | "tue":
        print("early week")
    case "fri":
        print("tgif")
    case _:
        print("other")
```
