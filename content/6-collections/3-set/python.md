```python
s = {"apple", "banana", "apple"}

len(s)                 # 2 — duplicates collapsed
"apple" in s           # True
s.add("cherry")
s.discard("banana")    # no error if absent

s1 | s2                # union
s1 & s2                # intersection
s1 - s2                # difference

for x in s:
    print(x)
```
