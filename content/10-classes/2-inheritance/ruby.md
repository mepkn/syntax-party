Single inheritance with `<` — mixins (modules) cover everything else.

```ruby
class Animal
  def initialize(name)
    @name = name
  end

  def speak
    "#{@name} makes a sound"
  end
end

class Dog < Animal
  def initialize(name, breed)
    super(name)
    @breed = breed
  end

  def speak
    "#{@name} barks"
  end
end
```
