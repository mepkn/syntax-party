No labeled break — to exit nested loops, extract a function and `return`.

```python
for x in xs:
    if x == "skip":
        continue
    if x == "stop":
        break
    print(x)
```
