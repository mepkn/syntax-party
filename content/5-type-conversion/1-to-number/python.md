```python
int("42")          # 42
int("2a", 16)      # 42         (base 16)
float("3.14")      # 3.14
int(3.9)           # 3          (truncates toward zero)
int("abc")         # ValueError — strict, no NaN
```
