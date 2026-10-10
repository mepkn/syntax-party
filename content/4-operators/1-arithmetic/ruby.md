Integer `/` truncates like Go — use a float operand for true division.

```ruby
10 + 3    # 13
10 - 3    # 7
10 * 3    # 30
10 / 3    # 3         (integer division when both ints)
10.0 / 3  # 3.333...
10 % 3    # 1
10 ** 3   # 1000      (exponent)

x = 5
# no ++ / -- operators
x += 2
```
