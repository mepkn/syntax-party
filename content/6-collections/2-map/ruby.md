Symbols (`:name`) are the conventional hash keys; any object can be a key.

```ruby
user = { name: "John", age: 25 }

user[:name]                # "John"
user[:age]                 # 25 (nil if missing — no error)
user[:email] = "a@b.c"     # add
user.delete(:age)          # remove

user.keys                  # [:name, :email]
user.values                # ["John", 25]
user.to_a                  # [[:name, "John"], ...]

user.each { |k, v| puts "#{k} #{v}" }
```
