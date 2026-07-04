`self.` defines a class method; constants are reached with `::`.

```ruby
class MathX
  PI = 3.14

  def self.square(x)
    x * x
  end
end

MathX::PI          # 3.14
MathX.square(5)    # 25
```
