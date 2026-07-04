```python
yes = True
no  = False

# falsy: False, 0, "", [], (), {}, set(), None
# truthy: everything else

bool(False)   # False
bool(0)       # False
bool("")      # False
bool([])      # False — empty list is falsy (unlike JS)
bool(())      # False — empty tuple is falsy
bool({})      # False — empty dict is falsy (unlike JS)
bool(set())   # False — empty set is falsy
bool(None)    # False
```
