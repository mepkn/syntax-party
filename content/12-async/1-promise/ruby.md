No promises — `Thread#value` blocks until the thread's result is ready.

```ruby
def load_user(id)
  Thread.new do
    sleep 0.1
    { id: id, name: "John" }
  end
end

user = load_user(1).value   # block until the value arrives
```
