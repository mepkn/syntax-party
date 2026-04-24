Python has no promises — coroutines run on an event loop and are awaited.

```python
import asyncio

async def load_user(id):
    await asyncio.sleep(0.1)
    if id > 0:
        return {"id": id, "name": "John"}
    raise ValueError("bad id")

asyncio.run(load_user(1))
```
