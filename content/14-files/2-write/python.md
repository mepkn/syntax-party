Mode `"w"` truncates; `"a"` appends.

```python
with open("notes.txt", "w") as f:
    f.write("hello\n")

with open("notes.txt", "a") as f:
    f.write("more\n")
```
