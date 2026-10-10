`attr_reader` / `attr_writer` / `attr_accessor` generate accessors in one line.

```ruby
class User
  attr_reader :name        # getter

  def initialize(name)
    @name = name
  end

  def name=(value)         # custom setter
    @name = value.strip
  end
end

u = User.new("John")
u.name               # "John"
u.name = "  Jane  "
```
