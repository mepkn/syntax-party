The `with` block closes the file automatically, even if an error is raised.

```python
with open("notes.txt") as f:
    text = f.read()

with open("notes.txt") as f:
    for line in f:          # stream line-by-line
        print(line.strip())
```
