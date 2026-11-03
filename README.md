# MT1 Lab Examination — Employee Task Manager

A Node.js project implementing employee task management using both the built-in HTTP module and Express.js.

## Project Structure

```
MT1-LABEXAM/
├── package.json          # Project config (ES Modules, Express dependency)
├── httpServer.js         # Part A: Built-in HTTP module server (Port 3000)
├── expressApp.js         # Part B: Express REST API (Port 4000)
├── public/
│   └── index.html        # Static HTML page served via FS module
└── screenshots/          # Evidence screenshots and test results
```

## Technologies

- **Node.js** v24+ with **ES Modules** (`import`/`export`)
- **Built-in `http` module** — Part A (Port 3000)
- **Built-in `fs` module** — Serve static HTML file
- **Express.js** — Part B REST API (Port 4000)
- **JavaScript Arrays** — In-memory data store (no database)

## Running the Servers

```bash
# Part A — HTTP Server on port 3000
node httpServer.js

# Part B — Express Server on port 4000
node expressApp.js
```

## Part A: HTTP Server Routes (Port 3000)

| Method | Route       | Description                             |
|--------|-------------|----------------------------------------|
| GET    | `/`         | Welcome page (HTML)                    |
| GET    | `/tasks`    | All tasks (JSON)                       |
| GET    | `/about`    | Application info (HTML)                |
| GET    | `/home`     | `public/index.html` via FS module      |
| POST   | `/add-task` | Add a task (JSON body required)        |

### POST /add-task Body (required fields)
```json
{
  "id": 4,
  "taskName": "Deploy Application",
  "assignedTo": "Dave",
  "status": "pending"
}
```

## Part B: Express REST API Routes (Port 4000)

| Method | Route         | Description              | Status Code |
|--------|---------------|--------------------------|-------------|
| GET    | `/tasks`      | Get all tasks            | 200         |
| GET    | `/tasks/:id`  | Get task by ID           | 200 / 404   |
| POST   | `/tasks`      | Create new task          | 201         |
| PUT    | `/tasks/:id`  | Update existing task     | 200 / 404   |
| DELETE | `/tasks/:id`  | Delete task by ID        | 200 / 404   |

### POST/PUT /tasks Body
```json
{
  "taskName": "Code Review",
  "assignedTo": "Frank Green",
  "status": "pending",
  "priority": "high"
}
```
Valid `status` values: `pending`, `in-progress`, `completed`  
Valid `priority` values: `low`, `medium`, `high`

## Error Handling

- **400** — Missing fields, invalid JSON, bad input
- **404** — Route or task not found
- **409** — Duplicate task ID (HTTP server)
- **500** — File read errors
