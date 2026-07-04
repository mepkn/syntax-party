`case/when` matches with `===` — ranges, classes, and regexps all work. No fallthrough.

```ruby
case day
when "mon", "tue"
  puts "early week"
when "fri"
  puts "tgif"
else
  puts "other"
end
```
