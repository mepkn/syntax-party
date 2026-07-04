`include` mixes a module's methods into a class — Ruby's answer to multiple inheritance.

```ruby
module Greetable
  def greet
    "Hi, I'm #{name}"
  end
end

class User
  include Greetable
  attr_reader :name

  def initialize(name)
    @name = name
  end
end

User.new("John").greet   # "Hi, I'm John"
```
