The `with` block closes the file automatically, even if an error is raised.

```python
with open("notes.txt") as f:
    text = f.read()

with open("notes.txt", "w") as f:
    f.write("hello\n")

with open("notes.txt", "a") as f:   # append
    f.write("more\n")
```
