```python
yes = True
no  = False

# falsy: False, 0, "", [], (), {}, set(), None
# truthy: everything else

bool(0)    # False
bool("")   # False
bool([])   # False  — empty list is falsy (unlike JS)
bool({})   # False  — empty dict is falsy (unlike JS)
bool(None) # False

not True         # False
True and False   # False
True or False    # True
```
