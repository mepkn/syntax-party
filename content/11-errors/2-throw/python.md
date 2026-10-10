```python
def get_age(user):
    if user is None:
        raise ValueError("user required")
    return user.age

# custom exception
class ValidationError(Exception):
    pass

raise ValidationError("bad input")
```
