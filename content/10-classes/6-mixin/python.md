Mixins are plain classes pulled in through multiple inheritance.

```python
class GreetableMixin:
    def greet(self):
        return f"Hi, I'm {self.name}"

class User(GreetableMixin):
    def __init__(self, name):
        self.name = name

User("John").greet()   # "Hi, I'm John"
```
