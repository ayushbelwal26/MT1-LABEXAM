# MT1 Lab Exam — Test Results Log

> Auto-generated test evidence for all endpoints.

## Part A: HTTP Server (Port 3000)

### GET / — Welcome Page
- Status: 200 OK  
- Content-Type: text/html  
- ✅ Returns styled HTML welcome page with navigation links

### GET /tasks — All Tasks
- Status: 200 OK  
- Content-Type: application/json  
- ✅ Returns JSON array with all tasks

```json
{
  "success": true,
  "count": 3,
  "tasks": [
    { "id": 1, "taskName": "Design Database Schema", "assignedTo": "Alice", "status": "completed" },
    { "id": 2, "taskName": "Develop REST API", "assignedTo": "Bob", "status": "in-progress" },
    { "id": 3, "taskName": "Write Unit Tests", "assignedTo": "Carol", "status": "pending" }
  ]
}
```

### GET /about — Application Info
- Status: 200 OK  
- Content-Type: text/html  
- ✅ Returns styled HTML with application metadata

### GET /home — FS Static File Serving
- Status: 200 OK  
- Content-Type: text/html  
- ✅ public/index.html served via fs.readFile()

### POST /add-task — Add Task (Success)
- Status: 201 Created  
- ✅ Task added to array

```json
{
  "success": true,
  "message": "Task added successfully.",
  "task": { "id": 4, "taskName": "Deploy Application", "assignedTo": "Dave", "status": "pending" },
  "totalTasks": 4
}
```

### POST /add-task — Missing Fields (400 Validation)
```json
{ "success": false, "error": "Missing required fields: assignedTo, status" }
```

### POST /add-task — Invalid JSON (400)
```json
{ "success": false, "error": "Invalid JSON in request body." }
```

### GET /invalid-route — 404 Handling
```json
{
  "success": false,
  "error": "Route GET /invalid-route not found.",
  "availableRoutes": ["GET /", "GET /tasks", "GET /about", "GET /home", "POST /add-task"]
}
```

---

## Part B: Express REST API (Port 4000)

### GET /tasks — All Tasks
- Status: 200 OK  
- ✅ Returns 5 sample tasks with id, taskName, assignedTo, status, priority

### GET /tasks/2 — Single Task by ID
- Status: 200 OK  
```json
{ "success": true, "task": { "id": 2, "taskName": "Develop REST API Endpoints", "assignedTo": "Bob Smith", "status": "in-progress", "priority": "high" } }
```

### GET /tasks/99 — Not Found
- Status: 404  
```json
{ "success": false, "error": "Task with id 99 not found." }
```

### POST /tasks — Create Task
- Status: 201 Created  
```json
{ "success": true, "message": "Task created successfully.", "task": { "id": 6, "taskName": "Code Review", "assignedTo": "Frank Green", "status": "pending", "priority": "high" }, "totalTasks": 6 }
```

### PUT /tasks/3 — Update Task
- Status: 200 OK  
```json
{ "success": true, "message": "Task updated successfully.", "task": { "id": 3, "taskName": "Write Unit Tests", "assignedTo": "Carol Williams", "status": "in-progress", "priority": "high" } }
```

### PUT /tasks/99 — Update Not Found
- Status: 404  
```json
{ "success": false, "error": "Task with id 99 not found." }
```

### DELETE /tasks/5 — Delete Task
- Status: 200 OK  
```json
{ "success": true, "message": "Task with id 5 deleted successfully.", "deletedTask": { "id": 5, "taskName": "Deploy to Production" }, "remainingTasks": 5 }
```

### DELETE /tasks/99 — Delete Not Found
- Status: 404  
```json
{ "success": false, "error": "Task with id 99 not found." }
```

---
*All tests passed ✅ — Generated automatically from running servers*
