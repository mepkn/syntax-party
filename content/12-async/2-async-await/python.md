`await` only works inside `async def`. A coroutine must be driven by an event loop (`asyncio.run`).

```python
import asyncio

async def get_user(id):
    try:
        user = await load_user(id)
        print(user)
    except ValueError as err:
        print(err)

asyncio.run(get_user(1))
```
