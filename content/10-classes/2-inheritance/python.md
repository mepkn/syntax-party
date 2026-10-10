`super()` reaches the parent. Multiple inheritance is allowed — resolved via MRO (method resolution order).

```python
class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        return f"{self.name} makes a sound"

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)
        self.breed = breed
    def speak(self):
        return f"{self.name} barks"
```
