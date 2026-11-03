# Express DELETE Endpoint Evidence

## DELETE /tasks/:id — Delete a Task

### Successful Deletion (200)

**Request:** `DELETE http://localhost:4000/tasks/5`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Task with id 5 deleted successfully.",
  "deletedTask": {
    "id": 5,
    "taskName": "Deploy to Production",
    "assignedTo": "Eve Martinez",
    "status": "pending",
    "priority": "low"
  },
  "remainingTasks": 4
}
```

---

### Task Not Found (404)

**Request:** `DELETE http://localhost:4000/tasks/99`

**Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Task with id 99 not found."
}
```

---

### Invalid ID (400)

**Request:** `DELETE http://localhost:4000/tasks/abc`

**Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "ID must be a number."
}
```

