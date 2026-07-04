`@staticmethod` skips `self`; `@classmethod` receives the class as the first arg.

```python
class MathX:
    PI = 3.14

    @staticmethod
    def square(x):
        return x * x

MathX.PI          # 3.14
MathX.square(5)   # 25
```
