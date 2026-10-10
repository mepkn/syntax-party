Spawn threads, then `value` each — the GVL limits parallelism to blocking I/O.

```ruby
threads = [1, 2].map do |id|
  Thread.new { load_user(id) }
end

users = threads.map(&:value)   # wait for all
```
