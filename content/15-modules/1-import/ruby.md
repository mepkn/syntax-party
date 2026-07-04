`require` loads a file once, globally — there are no per-file namespaces or named imports.

```ruby
require "json"            # stdlib or gem
require_relative "mathx"  # local file, relative path

JSON.parse("{}")
MathX.add(2, 3)
```
