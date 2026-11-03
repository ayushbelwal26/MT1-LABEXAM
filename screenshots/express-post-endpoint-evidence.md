# Express POST Endpoint Evidence

## POST /tasks — Create New Task

### Successful Creation (201)

**Request:**
```
POST http://localhost:4000/tasks
Content-Type: application/json

{
  "taskName": "Code Review",
  "assignedTo": "Frank Green",
  "status": "pending",
  "priority": "high"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Task created successfully.",
  "task": {
    "id": 6,
    "taskName": "Code Review",
    "assignedTo": "Frank Green",
    "status": "pending",
    "priority": "high"
  },
  "totalTasks": 6
}
```

---

### Missing Fields Validation (400)

**Request:**
```json
{ "taskName": "Incomplete Task" }
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "errors": [
    "assignedTo is required",
    "status is required",
    "priority is required"
  ]
}
```

---

### Invalid Status Value (400)

**Request:**
```json
{
  "taskName": "Test", "assignedTo": "John",
  "status": "unknown", "priority": "high"
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "errors": ["status must be one of: pending, in-progress, completed"]
}
```
