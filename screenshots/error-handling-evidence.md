# HTTP Error Handling Evidence

## 404 — Invalid Route

**Request:** `GET http://localhost:3000/invalid-route`

**Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Route GET /invalid-route not found.",
  "availableRoutes": [
    "GET /",
    "GET /tasks",
    "GET /about",
    "GET /home",
    "POST /add-task"
  ]
}
```

## 400 — Malformed JSON

**Request:** `POST http://localhost:3000/add-task` with body `{bad json}`

**Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Invalid JSON in request body."
}
```

## 400 — Missing Required Fields

**Request:**
```json
{ "id": 5, "taskName": "Incomplete" }
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Missing required fields: assignedTo, status"
}
```

## 409 — Duplicate Task ID

**Response (409 Conflict):**
```json
{
  "success": false,
  "error": "Task with id 1 already exists."
}
```

## 404 — File Not Found (/home with missing file)

If `public/index.html` is missing:
```html
<h1>404 — File Not Found</h1>
<p>public/index.html does not exist.</p>
```
