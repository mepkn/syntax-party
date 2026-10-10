`await` only works inside `async def`. A coroutine must be driven by an event loop (`asyncio.run`).

```python
import asyncio

async def get_user(user_id):
    try:
        user = await load_user(user_id)
        print(user)
    except ValueError as err:
        print(err)

asyncio.run(get_user(1))
```
