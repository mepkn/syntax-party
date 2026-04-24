`print` joins arguments with a space and appends a newline by default.

```python
import sys

print("Hello, World")
print("x =", 42, "y =", 7)           # space-separated
print("error", file=sys.stderr)
print("no newline", end="")
```
