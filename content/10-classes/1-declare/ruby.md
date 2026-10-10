`initialize` is the constructor; `@` marks instance variables, which are private by default.

```ruby
class User
  def initialize(name, age)
    @name = name
    @age = age
  end

  def greet
    "Hi, I'm #{@name}"
  end
end

u = User.new("John", 25)
u.greet
```
