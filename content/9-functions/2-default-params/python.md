Defaults are evaluated once at definition — never use a mutable default like `[]` or `{}`.

```python
def greet(name, msg="Hello"):
    return f"{msg}, {name}!"

greet("John")             # "Hello, John!"
greet("John", msg="Hi")   # "Hi, John!"  — keyword argument
```
