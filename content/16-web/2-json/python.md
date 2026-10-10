```python
import json

obj = json.loads('{"name":"John","age":25}')
obj["name"]            # "John"

json.dumps({"name": "John", "age": 25})
json.dumps(obj, indent=2)    # pretty-print
```
