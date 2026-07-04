Blocks make `map` / `select` / `each` the default way to work with arrays.

```ruby
xs = ["apple", "banana", "cherry"]

xs.length                  # 3
xs[0]                      # "apple"
xs.push("date")            # append (or xs << "date")
xs.pop                     # remove & return last
xs[1..2]                   # ["banana", "cherry"]

xs.map(&:upcase)               # map — &: is symbol-to-proc
xs.select { |x| x.length > 5 } # filter

xs.each { |x| puts x }
```
