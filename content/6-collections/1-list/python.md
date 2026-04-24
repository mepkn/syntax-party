```python
xs = ["apple", "banana", "cherry"]

len(xs)                    # 3
xs[0]                      # "apple"
xs.append("date")          # append
xs.pop()                   # remove & return last
xs[1:3]                    # ["banana", "cherry"]
[x.upper() for x in xs]    # list comprehension
[x for x in xs if len(x) > 5]

for x in xs:
    print(x)
```
