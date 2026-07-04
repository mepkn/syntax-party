`requests` for sync, `httpx` for async — neither is stdlib, both ubiquitous.

```python
# sync
import requests

res = requests.get("https://api.example.com/users")
data = res.json()

# async
import httpx

async def fetch():
    async with httpx.AsyncClient() as client:
        res = await client.get("https://api.example.com/users")
        return res.json()
```
