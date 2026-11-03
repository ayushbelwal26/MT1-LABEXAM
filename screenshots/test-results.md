# MT1 Lab Examination — Test Results & Screenshot Evidence Log

This document records the actual test execution and maps the generated screenshot files in `screenshots/`.

---

## 1. Screenshots Overview

| Screenshot File | Endpoint / Component | Module | Status Code | Content-Type | Verification |
|---|---|---|---|---|---|
| `01_http_get_welcome.png` | `GET /` | Part A (Port 3000) | `200 OK` | `text/html` | Genuine Chrome browser view of styled welcome page |
| `02_http_get_tasks.png` | `GET /tasks` | Part A (Port 3000) | `200 OK` | `application/json` | Genuine Chrome browser view of all tasks in JSON format |
| `03_http_get_about.png` | `GET /about` | Part A (Port 3000) | `200 OK` | `text/html` | Genuine Chrome browser view of application info table |
| `04_http_get_home_fs.png` | `GET /home` | Part A (Port 3000) | `200 OK` | `text/html` | Genuine Chrome browser view of `public/index.html` served via FS module |
| `05_http_invalid_route_404.png` | `GET /invalid-route` | Part A (Port 3000) | `404 Not Found` | `application/json` | Genuine Chrome browser view of 404 route handling |
| `06_express_get_tasks.png` | `GET /tasks` | Part B (Port 4000) | `200 OK` | `application/json` | Genuine Chrome browser view of all tasks array from Express API |
| `07_express_get_task_by_id.png` | `GET /tasks/1` | Part B (Port 4000) | `200 OK` | `application/json` | Genuine Chrome browser view of task with ID 1 |
| `08_express_get_task_not_found_404.png` | `GET /tasks/99` | Part B (Port 4000) | `404 Not Found` | `application/json` | Genuine Chrome browser view of Express 404 Not Found |

---

## 2. Part A: HTTP Module Test Results (Port 3000)

### 2.1 GET /
- **URL:** `http://localhost:3000/`
- **Status:** `200 OK`
- **Content-Type:** `text/html`
- **Screenshot:** `screenshots/01_http_get_welcome.png`

### 2.2 GET /tasks
- **URL:** `http://localhost:3000/tasks`
- **Status:** `200 OK`
- **Content-Type:** `application/json`
- **Response Body:**
```json
[
  {
    "id": 1,
    "taskName": "Develop Login Page",
    "assignedTo": "Rahul Sharma",
    "status": "Pending"
  },
  {
    "id": 2,
    "taskName": "Design Database Schema",
    "assignedTo": "Priya Patel",
    "status": "In Progress"
  },
  {
    "id": 3,
    "taskName": "Write Unit Tests",
    "assignedTo": "Ankit Verma",
    "status": "Pending"
  }
]
```
- **Screenshot:** `screenshots/02_http_get_tasks.png`

### 2.3 GET /about
- **URL:** `http://localhost:3000/about`
- **Status:** `200 OK`
- **Content-Type:** `text/html`
- **Screenshot:** `screenshots/03_http_get_about.png`

### 2.4 GET /home (Static File Serving via FS Module)
- **URL:** `http://localhost:3000/home`
- **Status:** `200 OK`
- **Content-Type:** `text/html`
- **Verification:** Successfully read `public/index.html` using `fs.readFile()` and served to client.
- **Screenshot:** `screenshots/04_http_get_home_fs.png`

### 2.5 POST /add-task
- **URL:** `http://localhost:3000/add-task`
- **Method:** `POST`
- **Request Body:**
```json
{
  "id": 4,
  "taskName": "Develop REST API",
  "assignedTo": "Amit Kumar",
  "status": "Pending"
}
```
- **Response Status:** `201 Created`
- **Response Body:**
```json
{
  "message": "Task added successfully",
  "task": {
    "id": 4,
    "taskName": "Develop REST API",
    "assignedTo": "Amit Kumar",
    "status": "Pending"
  }
}
```

### 2.6 POST /add-task (Validation Error)
- **URL:** `http://localhost:3000/add-task`
- **Method:** `POST`
- **Request Body:** `{"id": 5, "taskName": "Missing Fields"}`
- **Response Status:** `400 Bad Request`
- **Response Body:**
```json
{
  "message": "Validation failed: id, taskName, assignedTo and status are required fields"
}
```

### 2.7 404 Route Error Handling
- **URL:** `http://localhost:3000/invalid-route`
- **Response Status:** `404 Not Found`
- **Screenshot:** `screenshots/05_http_invalid_route_404.png`

---

## 3. Part B: Express REST API Test Results (Port 4000)

### 3.1 GET /tasks
- **URL:** `http://localhost:4000/tasks`
- **Status:** `200 OK`
- **Screenshot:** `screenshots/06_express_get_tasks.png`

### 3.2 GET /tasks/1
- **URL:** `http://localhost:4000/tasks/1`
- **Status:** `200 OK`
- **Response Body:**
```json
{
  "id": 1,
  "taskName": "Develop Login Page",
  "assignedTo": "Rahul Sharma",
  "status": "Pending",
  "priority": "High"
}
```
- **Screenshot:** `screenshots/07_express_get_task_by_id.png`

### 3.3 GET /tasks/99 (Not Found)
- **URL:** `http://localhost:4000/tasks/99`
- **Status:** `404 Not Found`
- **Screenshot:** `screenshots/08_express_get_task_not_found_404.png`

### 3.4 POST /tasks
- **URL:** `http://localhost:4000/tasks`
- **Status:** `201 Created`
- **Request Body:**
```json
{
  "id": 4,
  "taskName": "Develop REST API",
  "assignedTo": "Amit Kumar",
  "status": "Pending",
  "priority": "Medium"
}
```
- **Response Body:**
```json
{
  "message": "Task added successfully",
  "task": {
    "id": 4,
    "taskName": "Develop REST API",
    "assignedTo": "Amit Kumar",
    "status": "Pending",
    "priority": "Medium"
  }
}
```

### 3.5 PUT /tasks/1
- **URL:** `http://localhost:4000/tasks/1`
- **Status:** `200 OK`
- **Request Body:**
```json
{
  "taskName": "Develop Login Page",
  "assignedTo": "Rahul Sharma",
  "status": "Completed",
  "priority": "High"
}
```
- **Response Body:**
```json
{
  "message": "Task updated successfully",
  "task": {
    "id": 1,
    "taskName": "Develop Login Page",
    "assignedTo": "Rahul Sharma",
    "status": "Completed",
    "priority": "High"
  }
}
```

### 3.6 DELETE /tasks/1
- **URL:** `http://localhost:4000/tasks/1`
- **Status:** `200 OK`
- **Response Body:**
```json
{
  "message": "Task deleted successfully"
}
```
