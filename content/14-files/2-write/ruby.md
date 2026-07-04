```ruby
File.write("notes.txt", "hello\n")             # create or overwrite
File.write("notes.txt", "more\n", mode: "a")   # append
```
