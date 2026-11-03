# Express GET Endpoints Evidence

## GET /tasks — Retrieve All Tasks

**Request:** `GET http://localhost:4000/tasks`

**Response (200 OK):**
```json
{
  "success": true,
  "count": 5,
  "tasks": [
    { "id": 1, "taskName": "Design System Architecture", "assignedTo": "Alice Johnson", "status": "completed", "priority": "high" },
    { "id": 2, "taskName": "Develop REST API Endpoints", "assignedTo": "Bob Smith", "status": "in-progress", "priority": "high" },
    { "id": 3, "taskName": "Write Unit Tests", "assignedTo": "Carol Williams", "status": "pending", "priority": "medium" },
    { "id": 4, "taskName": "Set Up CI/CD Pipeline", "assignedTo": "David Lee", "status": "pending", "priority": "medium" },
    { "id": 5, "taskName": "Deploy to Production", "assignedTo": "Eve Martinez", "status": "pending", "priority": "low" }
  ]
}
```

---

## GET /tasks/:id — Retrieve Task by ID

**Request:** `GET http://localhost:4000/tasks/2`

**Response (200 OK):**
```json
{
  "success": true,
  "task": {
    "id": 2,
    "taskName": "Develop REST API Endpoints",
    "assignedTo": "Bob Smith",
    "status": "in-progress",
    "priority": "high"
  }
}
```

---

## GET /tasks/99 — Task Not Found

**Request:** `GET http://localhost:4000/tasks/99`

**Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Task with id 99 not found."
}
```
