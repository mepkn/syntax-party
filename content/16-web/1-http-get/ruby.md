`net/http` is stdlib; most projects reach for gems like `faraday` or `httparty`.

```ruby
require "net/http"
require "json"

res = Net::HTTP.get(URI("https://api.example.com/users"))
data = JSON.parse(res)
```
