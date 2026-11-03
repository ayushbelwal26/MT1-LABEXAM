# POST /add-task — Test Evidence

## Successful POST /add-task

**Request:**
```
POST http://localhost:3000/add-task
Content-Type: application/json

{
  "id": 4,
  "taskName": "Deploy Application",
  "assignedTo": "Dave",
  "status": "pending"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Task added successfully.",
  "task": {
    "id": 4,
    "taskName": "Deploy Application",
    "assignedTo": "Dave",
    "status": "pending"
  },
  "totalTasks": 4
}
```

## Validation Error — Missing Fields (400)

**Request:**
```json
{ "id": 5, "taskName": "Incomplete Task" }
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Missing required fields: assignedTo, status"
}
```

## Invalid JSON (400)

**Request body:** `{bad json}`

**Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Invalid JSON in request body."
}
```

## Duplicate ID (409)

**Response (409 Conflict):**
```json
{
  "success": false,
  "error": "Task with id 4 already exists."
}
```
