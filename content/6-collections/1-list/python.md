```python
xs = ["apple", "banana", "cherry"]

len(xs)                    # 3
xs[0]                      # "apple"
xs.append("date")          # append
xs.pop()                   # remove & return last
xs[1:3]                    # ["banana", "cherry"]

list(map(lambda x: x.upper(), xs))
list(filter(lambda x: len(x) > 5, xs))
# list comprehension is more pythonic over map and filter
[x.upper() for x in xs]   
[x for x in xs if len(x) > 5]

for x in xs:
    print(x)
```
