No exports — `require` exposes everything; wrap code in a `module` to namespace it.

```ruby
# mathx.rb
module MathX
  PI = 3.14

  def self.add(a, b)
    a + b
  end
end

# after require: MathX.add(2, 3), MathX::PI
```
