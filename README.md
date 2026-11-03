# MT1 Lab Examination — Employee Task Management Web Application

Subject: Full Stack Development – Node.js Lab Examination  
Technology: Node.js, Built-in HTTP Module, Built-in FS Module, Express.js  
Database: Not Required (JavaScript Arrays in Memory)  
Module System: ES Modules (`import` / `export`)  

---

## 1. Project Overview

This project implements an Employee Task Management application in two independent modules:
- **Part A (`httpServer.js`)**: Runs on **Port 3000** using built-in `http` and `fs` modules (no Express).
- **Part B (`expressApp.js`)**: Runs on **Port 4000** using `express` to implement a complete REST API with CRUD operations.

---

## 2. Project Structure

```
MT1-LABEXAM/
│
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
├── httpServer.js
├── expressApp.js
├── public/
│   └── index.html
└── screenshots/
    ├── Part-A/
    │   ├── 01_http_get_welcome.png
    │   ├── 02_http_get_tasks.png
    │   ├── 03_http_get_about.png
    │   ├── 04_http_get_home_fs.png
    │   └── 05_http_invalid_route_404.png
    ├── Part-B/
    │   ├── 01_echoapi_get_all_tasks.jpg
    │   ├── 02_echoapi_get_task_by_id.jpg
    │   ├── 03_echoapi_post_task.jpg
    │   ├── 04_echoapi_put_task.jpg
    │   └── 05_echoapi_delete_task.jpg
    ├── server_and_terminal/
    │   ├── http_server_running.png
    │   └── express_server_running.png
    └── github/
        └── github_commit_history.jpg
```

---

## 3. Running the Application

### Step 1: Start HTTP Server (Part A)
```bash
node httpServer.js
```
**Expected Output:**
```
HTTP Server running at http://localhost:3000
```

**Routes:**
- `GET http://localhost:3000/` — Welcome message in HTML format
- `GET http://localhost:3000/tasks` — List of employee tasks in JSON format
- `GET http://localhost:3000/about` — Employee task management application information
- `GET http://localhost:3000/home` — Serve `index.html` from public directory using FS module
- `POST http://localhost:3000/add-task` — Add a new task (validates `id`, `taskName`, `assignedTo`, `status`)

### Step 2: Start Express Application (Part B)
```bash
node expressApp.js
```
**Expected Output:**
```
Express Server running at http://localhost:4000
```

**REST API Endpoints:**
- `GET /tasks` — Retrieve all employee tasks
- `GET /tasks/:id` — Retrieve a task by ID (returns 404 if not found)
- `POST /tasks` — Add a new task (returns HTTP 201)
- `PUT /tasks/:id` — Update task details
- `DELETE /tasks/:id` — Delete a task

---

## 4. API Testing Using EchoAPI (Part B)

| Method | URL | Description / Expected Result |
|---|---|---|
| `GET` | `http://localhost:4000/tasks` | Display all tasks |
| `GET` | `http://localhost:4000/tasks/1` | Display task with ID 1 |
| `POST` | `http://localhost:4000/tasks` | Add a new task (HTTP 201) |
| `PUT` | `http://localhost:4000/tasks/1` | Update task details |
| `DELETE` | `http://localhost:4000/tasks/1` | Delete a task |

### Sample POST Request
**URL:** `http://localhost:4000/tasks`  
**Body (raw JSON):**
```json
{
  "id": 4,
  "taskName": "Develop REST API",
  "assignedTo": "Amit Kumar",
  "status": "Pending",
  "priority": "Medium"
}
```
**Expected Response:**
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

### Sample PUT Request
**URL:** `http://localhost:4000/tasks/1`  
**Body (raw JSON):**
```json
{
  "taskName": "Develop Login Page",
  "assignedTo": "Rahul Sharma",
  "status": "Completed",
  "priority": "High"
}
```
**Expected Response:**
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

### Sample DELETE Request
**URL:** `http://localhost:4000/tasks/1`  
**Expected Response:**
```json
{
  "message": "Task deleted successfully"
}
```
