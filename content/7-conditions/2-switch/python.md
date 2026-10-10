`match` requires Python 3.10+. No fallthrough; `|` stacks patterns.

```python
match day:
    case "mon" | "tue":
        print("early week")
    case "fri":
        print("tgif")
    case _:
        print("other")
```
