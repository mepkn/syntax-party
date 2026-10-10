`@property` turns a method into a read-accessor; its `.setter` pairs it with a write-accessor.

```python
class User:
    def __init__(self, name):
        self._name = name

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, value):
        self._name = value.strip()

u = User("John")
u.name               # "John"  — no parentheses
u.name = "  Jane  "
```
