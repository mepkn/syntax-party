```python
for x in xs:
    if x == "skip":
        continue
    if x == "stop":
        break
    print(x)
else:
    # runs only if the loop wasn't broken out of
    print("finished without break")
```
