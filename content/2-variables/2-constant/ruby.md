Capitalized names are constants, but reassignment is only a warning — `freeze` prevents mutation.

```ruby
PI = 3.14159
MAX_RETRIES = 3

CONFIG = { debug: false }.freeze
```
