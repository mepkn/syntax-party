`*args` collects positional arguments into a tuple; `**kwargs` collects keywords into a dict.

```python
def sum_all(*nums):
    return sum(nums)

sum_all(1, 2, 3)       # 6

# unpack when calling
xs = [1, 2, 3]
sum_all(*xs)           # 6

def configure(**kwargs):
    print(kwargs)      # {'host': ..., 'port': ...}
```
