```ruby
text = File.read("notes.txt")

File.foreach("notes.txt") do |line|   # stream line-by-line
  puts line.chomp
end
```
