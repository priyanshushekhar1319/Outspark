FROM python:3.13-slim

WORKDIR /app

COPY backend/ ./

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

4. **Commit changes** ✅

Railway auto redeploy karega — logs mein:
```
✅ Database ready!
INFO: Uvicorn running on http://0.0.0.0:8000
