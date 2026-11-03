# Express PUT Endpoint Evidence

## PUT /tasks/:id — Update Existing Task

### Successful Update (200)

**Request:**
```
PUT http://localhost:4000/tasks/3
Content-Type: application/json

{
  "status": "in-progress",
  "priority": "high"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Task updated successfully.",
  "task": {
    "id": 3,
    "taskName": "Write Unit Tests",
    "assignedTo": "Carol Williams",
    "status": "in-progress",
    "priority": "high"
  }
}
```

---

### Task Not Found (404)

**Request:** `PUT http://localhost:4000/tasks/99`

**Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Task with id 99 not found."
}
```

---

### Empty Body (400)

**Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Request body with at least one field is required."
}
```
