Parsed keys are strings — pass `symbolize_names: true` for symbol keys.

```ruby
require "json"

obj = JSON.parse('{"name":"John","age":25}')
obj["name"]            # "John"

JSON.generate({ name: "John", age: 25 })
JSON.pretty_generate(obj)    # pretty-print
```
