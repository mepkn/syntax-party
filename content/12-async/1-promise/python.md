Python has no promises — coroutines run on an event loop and are awaited.

```python
import asyncio

async def load_user(user_id):
    await asyncio.sleep(0.1)
    if user_id > 0:
        return {"id": user_id, "name": "John"}
    raise ValueError("bad id")

asyncio.run(load_user(1))
```
