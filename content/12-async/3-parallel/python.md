`asyncio.gather` runs coroutines concurrently; `return_exceptions=True` keeps one failure from cancelling the rest.

```python
import asyncio

async def main():
    a, b = await asyncio.gather(load_user(1), load_user(2))

    results = await asyncio.gather(
        load_user(1), load_user(-1),
        return_exceptions=True,   # errors returned as values
    )

asyncio.run(main())
```
