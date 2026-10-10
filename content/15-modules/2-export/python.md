Everything defined at module scope is importable — there's no `export` keyword. Leading underscore signals "private" by convention.

```python
def add(a, b):
    return a + b

PI = 3.14

_internal = 1            # convention: treat as private

# __all__ controls `from mymod import *`
__all__ = ["add", "PI"]
```
