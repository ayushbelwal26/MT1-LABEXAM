# Express Application Setup Evidence

## Server Startup

**Command:** `node expressApp.js`

**Terminal Output:**
```
✅ Express Server running on http://localhost:4000
   Routes: GET /tasks, GET /tasks/:id, POST /tasks, PUT /tasks/:id, DELETE /tasks/:id
```

## Configuration

- **Port:** 4000
- **Module:** ES Modules (`import express from 'express'`)
- **Middleware:** `express.json()` for JSON body parsing
- **Data Store:** JavaScript array (5 sample tasks, no database)

## Sample Task Structure

```json
{
  "id": 1,
  "taskName": "Design System Architecture",
  "assignedTo": "Alice Johnson",
  "status": "completed",
  "priority": "high"
}
```

## Initial Tasks Array (5 records)

| ID | Task Name                    | Assigned To     | Status      | Priority |
|----|------------------------------|-----------------|-------------|----------|
| 1  | Design System Architecture   | Alice Johnson   | completed   | high     |
| 2  | Develop REST API Endpoints   | Bob Smith       | in-progress | high     |
| 3  | Write Unit Tests             | Carol Williams  | pending     | medium   |
| 4  | Set Up CI/CD Pipeline        | David Lee       | pending     | medium   |
| 5  | Deploy to Production         | Eve Martinez    | pending     | low      |

