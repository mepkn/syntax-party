```python
user = {"name": "John", "age": 25}

user["name"]               # "John"
user.get("age")            # 25  (None if missing — no KeyError)
user["email"] = "a@b.c"    # add
del user["age"]            # remove

list(user.keys())
list(user.values())
list(user.items())         # [("name", "John"), ...]

for k, v in user.items():
    print(k, v)
```
