`requests` for sync, `aiohttp` for async. Neither is stdlib but both are near-universal.

```python
# sync
import requests

res = requests.get("https://api.example.com/users")
data = res.json()

# async
import aiohttp, asyncio

async def fetch():
    async with aiohttp.ClientSession() as s:
        async with s.get("https://api.example.com/users") as r:
            return await r.json()
```
