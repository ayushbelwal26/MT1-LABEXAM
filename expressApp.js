// expressApp.js — Part B: Employee Task Management REST API Using Express.js (Port 4000)
// MT1 Lab Examination

import express from 'express';

const app = express();

// ── B1. Configure Middleware ───────────────────────────────────────────────

app.use(express.json());

// ── B1 & B3. Initialize Sample Task Array (No Database) ───────────────────

let tasks = [
  {
    id: 1,
    taskName: 'Develop Login Page',
    assignedTo: 'Rahul Sharma',
    status: 'Pending',
    priority: 'High'
  },
  {
    id: 2,
    taskName: 'Design Database Schema',
    assignedTo: 'Priya Patel',
    status: 'In Progress',
    priority: 'Medium'
  },
  {
    id: 3,
    taskName: 'Write Unit Tests',
    assignedTo: 'Ankit Verma',
    status: 'Pending',
    priority: 'Low'
  }
];

// Helper to determine next available ID
let nextId = 4;

// ── B2. CRUD Operations ───────────────────────────────────────────────────

// GET /tasks — Retrieve all employee tasks
app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// GET /tasks/:id — Retrieve a task by ID
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);

  if (isNaN(taskId)) {
    return res.status(400).json({ message: 'Task ID must be a valid number' });
  }

  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    return res.status(404).json({ message: `Task with ID ${taskId} not found` });
  }

  res.status(200).json(task);
});

// POST /tasks — Add a new task (HTTP 201)
app.post('/tasks', (req, res) => {
  const { id, taskName, assignedTo, status, priority } = req.body;

  // Validation
  if (!taskName || !assignedTo || !status || !priority) {
    return res.status(400).json({
      message: 'Validation failed: taskName, assignedTo, status and priority are required fields'
    });
  }

  // Use provided ID or generate a new one
  const taskId = id !== undefined ? Number(id) : nextId++;

  // Check for duplicate ID
  const exists = tasks.find(t => t.id === taskId);
  if (exists) {
    return res.status(409).json({ message: `Task with ID ${taskId} already exists` });
  }

  const newTask = {
    id: taskId,
    taskName,
    assignedTo,
    status,
    priority
  };

  tasks.push(newTask);

  res.status(201).json({
    message: 'Task added successfully',
    task: newTask
  });
});

// PUT /tasks/:id — Update task details
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);

  if (isNaN(taskId)) {
    return res.status(400).json({ message: 'Task ID must be a valid number' });
  }

  const index = tasks.findIndex(t => t.id === taskId);
  if (index === -1) {
    return res.status(404).json({ message: `Task with ID ${taskId} not found` });
  }

  const { taskName, assignedTo, status, priority } = req.body;

  if (!taskName && !assignedTo && !status && !priority) {
    return res.status(400).json({ message: 'At least one field is required to update' });
  }

  // Update existing task record
  tasks[index] = {
    ...tasks[index],
    ...(taskName !== undefined && { taskName }),
    ...(assignedTo !== undefined && { assignedTo }),
    ...(status !== undefined && { status }),
    ...(priority !== undefined && { priority })
  };

  res.status(200).json({
    message: 'Task updated successfully',
    task: tasks[index]
  });
});

// DELETE /tasks/:id — Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);

  if (isNaN(taskId)) {
    return res.status(400).json({ message: 'Task ID must be a valid number' });
  }

  const index = tasks.findIndex(t => t.id === taskId);
  if (index === -1) {
    return res.status(404).json({ message: `Task with ID ${taskId} not found` });
  }

  tasks.splice(index, 1);

  res.status(200).json({
    message: 'Task deleted successfully'
  });
});

// ── Error Handling for Invalid Routes ──────────────────────────────────────

app.use((req, res) => {
  res.status(404).json({
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// ── JSON Parse Error Middleware ────────────────────────────────────────────

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON payload' });
  }
  next();
});

// ── B1. Configure Application to Listen on Port 4000 ───────────────────────

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Express Server running at http://localhost:${PORT}`);
});
