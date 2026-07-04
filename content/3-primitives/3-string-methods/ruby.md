Bang variants (`strip!`, `upcase!`) mutate the string in place.

```ruby
s = "  Hello, World!  "

s.length                    # 17
s.strip                     # "Hello, World!"
s.upcase                    # "  HELLO, WORLD!  "
s.downcase                  # "  hello, world!  "
s[0]                        # " "
s[2..6]                     # "Hello"
s.include?("World")         # true
s.sub("World", "Ruby")      # "  Hello, Ruby!  "
s.split(", ")               # ["  Hello", "World!  "]
```
