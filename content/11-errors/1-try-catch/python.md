Multiple `except` clauses match by type. `else` runs only when no exception fired.

```python
try:
    risky_op()
except ValueError as err:
    print(err)
except Exception as err:
    print("unexpected:", err)
else:
    print("no error")
finally:
    cleanup()
```
