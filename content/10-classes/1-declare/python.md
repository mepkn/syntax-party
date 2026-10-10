`__init__` is the constructor. The first parameter of every instance method is `self`.

```python
class User:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        return f"Hi, I'm {self.name}"

u = User("John", 25)
u.greet()
```
