No `async`/`await` keywords — the `async` gem builds structured concurrency on Ruby 3 Fibers.

```ruby
# synchronous by default
user = load_user(1)
puts user

# concurrent — the async gem
require "async"

Async do |task|
  task.async { load_user(2) }
end
```
