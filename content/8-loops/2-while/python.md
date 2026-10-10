No `do...while` — simulate with `while True` + `break`.

```python
i = 0
while i < 5:
    print(i)
    i += 1

# do-while equivalent
while True:
    i += 1
    if i >= 10:
        break
```
