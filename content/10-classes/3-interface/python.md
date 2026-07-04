Duck typing is the default; `Protocol` adds a structural interface for static checkers.

```python
# any object with .speak() works
def announce(speaker):
    print(speaker.speak())

announce(Dog("Rex"))

# optional — for static type checkers
from typing import Protocol

class Speaker(Protocol):
    def speak(self) -> str: ...
```
