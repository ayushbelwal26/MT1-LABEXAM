// expressApp.js — Part B: Express REST API (Port 4000)
// MT1 Lab Examination

import express from 'express';

const app = express();

// ── Middleware ─────────────────────────────────────────────────────────────

app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ── Sample Data ────────────────────────────────────────────────────────────

// In-memory array — no database
let tasks = [
  {
    id: 1,
    taskName: 'Design System Architecture',
    assignedTo: 'Alice Johnson',
    status: 'completed',
    priority: 'high',
  },
  {
    id: 2,
    taskName: 'Develop REST API Endpoints',
    assignedTo: 'Bob Smith',
    status: 'in-progress',
    priority: 'high',
  },
  {
    id: 3,
    taskName: 'Write Unit Tests',
    assignedTo: 'Carol Williams',
    status: 'pending',
    priority: 'medium',
  },
  {
    id: 4,
    taskName: 'Set Up CI/CD Pipeline',
    assignedTo: 'David Lee',
    status: 'pending',
    priority: 'medium',
  },
  {
    id: 5,
    taskName: 'Deploy to Production',
    assignedTo: 'Eve Martinez',
    status: 'pending',
    priority: 'low',
  },
];

// Auto-increment helper
let nextId = tasks.length + 1;

// ── Validation Helper ──────────────────────────────────────────────────────

const VALID_STATUSES   = ['pending', 'in-progress', 'completed'];
const VALID_PRIORITIES = ['low', 'medium', 'high'];

function validateTaskFields(body, requireAll = true) {
  const errors = [];
  const { taskName, assignedTo, status, priority } = body;

  if (requireAll) {
    if (!taskName)   errors.push('taskName is required');
    if (!assignedTo) errors.push('assignedTo is required');
    if (!status)     errors.push('status is required');
    if (!priority)   errors.push('priority is required');
  }

  if (status && !VALID_STATUSES.includes(status)) {
    errors.push(`status must be one of: ${VALID_STATUSES.join(', ')}`);
  }
  if (priority && !VALID_PRIORITIES.includes(priority)) {
    errors.push(`priority must be one of: ${VALID_PRIORITIES.join(', ')}`);
  }

  return errors;
}

// ── Routes ─────────────────────────────────────────────────────────────────

// GET /tasks — Retrieve all tasks
app.get('/tasks', (req, res) => {
  res.status(200).json({
    success: true,
    count: tasks.length,
    tasks,
  });
});

// GET /tasks/:id — Retrieve a task by ID
app.get('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ success: false, error: 'ID must be a number.' });
  }

  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({
      success: false,
      error: `Task with id ${id} not found.`,
    });
  }

  res.status(200).json({ success: true, task });
});

// POST /tasks — Create a new task (HTTP 201)
app.post('/tasks', (req, res) => {
  const body = req.body;

  if (!body || Object.keys(body).length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Request body is required.',
    });
  }

  const errors = validateTaskFields(body, true);
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  const newTask = {
    id: nextId++,
    taskName:   body.taskName,
    assignedTo: body.assignedTo,
    status:     body.status,
    priority:   body.priority,
  };

  tasks.push(newTask);

  res.status(201).json({
    success: true,
    message: 'Task created successfully.',
    task: newTask,
    totalTasks: tasks.length,
  });
});

// PUT /tasks/:id — Update an existing task
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ success: false, error: 'ID must be a number.' });
  }

  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: `Task with id ${id} not found.`,
    });
  }

  const body = req.body;
  if (!body || Object.keys(body).length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Request body with at least one field is required.',
    });
  }

  const errors = validateTaskFields(body, false);
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  // Merge updated fields
  const updatedTask = {
    ...tasks[index],
    ...(body.taskName   && { taskName:   body.taskName }),
    ...(body.assignedTo && { assignedTo: body.assignedTo }),
    ...(body.status     && { status:     body.status }),
    ...(body.priority   && { priority:   body.priority }),
  };

  tasks[index] = updatedTask;

  res.status(200).json({
    success: true,
    message: 'Task updated successfully.',
    task: updatedTask,
  });
});

// DELETE /tasks/:id — Delete a task
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ success: false, error: 'ID must be a number.' });
  }

  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: `Task with id ${id} not found.`,
    });
  }

  const deleted = tasks.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: `Task with id ${id} deleted successfully.`,
    deletedTask: deleted,
    remainingTasks: tasks.length,
  });
});

// ── 404 Handler ────────────────────────────────────────────────────────────

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.originalUrl} not found.`,
    availableRoutes: [
      'GET  /tasks',
      'GET  /tasks/:id',
      'POST /tasks',
      'PUT  /tasks/:id',
      'DELETE /tasks/:id',
    ],
  });
});

// ── Error Handler ──────────────────────────────────────────────────────────

// Handle invalid JSON bodies sent by clients
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      success: false,
      error: 'Invalid JSON in request body.',
    });
  }
  console.error(err);
  res.status(500).json({ success: false, error: 'Internal Server Error.' });
});

// ── Start Server ───────────────────────────────────────────────────────────

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Express Server running on http://localhost:${PORT}`);
  console.log('   Routes: GET /tasks, GET /tasks/:id, POST /tasks, PUT /tasks/:id, DELETE /tasks/:id');
});
