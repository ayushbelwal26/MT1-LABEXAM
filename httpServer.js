// httpServer.js — Part A: Built-in HTTP Module (Port 3000)
// MT1 Lab Examination

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory task store (JavaScript array — no database)
const tasks = [
  { id: 1, taskName: 'Design Database Schema', assignedTo: 'Alice', status: 'completed' },
  { id: 2, taskName: 'Develop REST API',        assignedTo: 'Bob',   status: 'in-progress' },
  { id: 3, taskName: 'Write Unit Tests',         assignedTo: 'Carol', status: 'pending' },
];

// ── Helpers ────────────────────────────────────────────────────────────────

/** Send a JSON response */
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data, null, 2));
}

/** Send an HTML response */
function sendHTML(res, statusCode, html) {
  res.writeHead(statusCode, { 'Content-Type': 'text/html' });
  res.end(html);
}

/** Collect the request body and parse it as JSON */
function parseJSONBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      if (!body.trim()) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

// ── Route Handlers ─────────────────────────────────────────────────────────

/** GET / — Welcome page */
function handleRoot(req, res) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Task Manager — Welcome</title>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background:#f0f2f5; display:flex;
           align-items:center; justify-content:center; min-height:100vh; margin:0; }
    .card { background:#fff; border-radius:12px; padding:40px 50px;
            box-shadow:0 4px 24px rgba(0,0,0,.12); text-align:center; }
    h1 { color:#4a4a8a; margin-bottom:8px; }
    p  { color:#666; margin-bottom:6px; }
    a  { color:#667eea; text-decoration:none; font-weight:bold; }
    .badge { display:inline-block; background:#667eea; color:#fff;
             border-radius:20px; padding:4px 14px; font-size:.8rem; margin-top:16px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>🏠 Welcome to Task Manager</h1>
    <p>MT1 Lab Examination — Employee Task Management System</p>
    <p>Built with Node.js built-in <strong>http</strong> module &bull; Port 3000</p>
    <div class="badge">ES Modules · No Database · JavaScript Arrays</div>
    <br/><br/>
    <p><a href="/tasks">📋 View All Tasks</a> &nbsp;|&nbsp;
       <a href="/about">ℹ️ About</a> &nbsp;|&nbsp;
       <a href="/home">🏡 Home Page</a></p>
  </div>
</body>
</html>`;
  sendHTML(res, 200, html);
}

/** GET /tasks — Return all tasks as JSON */
function handleGetTasks(req, res) {
  sendJSON(res, 200, {
    success: true,
    count: tasks.length,
    tasks,
  });
}

/** GET /about — Application info */
function handleAbout(req, res) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>About — Task Manager</title>
  <style>
    body { font-family:'Segoe UI',sans-serif; background:#f0f2f5; display:flex;
           align-items:center; justify-content:center; min-height:100vh; margin:0; }
    .card { background:#fff; border-radius:12px; padding:40px 50px;
            box-shadow:0 4px 24px rgba(0,0,0,.12); max-width:540px; width:90%; }
    h1 { color:#4a4a8a; margin-bottom:16px; }
    table { width:100%; border-collapse:collapse; }
    td { padding:10px 12px; border-bottom:1px solid #eee; color:#555; font-size:.95rem; }
    td:first-child { font-weight:bold; color:#333; width:40%; }
    a { color:#667eea; }
  </style>
</head>
<body>
  <div class="card">
    <h1>ℹ️ About This Application</h1>
    <table>
      <tr><td>Application</td><td>Employee Task Manager</td></tr>
      <tr><td>Version</td><td>1.0.0</td></tr>
      <tr><td>Part</td><td>Part A — Built-in HTTP Module</td></tr>
      <tr><td>Port</td><td>3000</td></tr>
      <tr><td>Technology</td><td>Node.js built-in http &amp; fs modules</td></tr>
      <tr><td>Module System</td><td>ES Modules (import/export)</td></tr>
      <tr><td>Database</td><td>None — JavaScript Array in memory</td></tr>
      <tr><td>Exam</td><td>MT1 Lab Examination</td></tr>
      <tr><td>Endpoints</td><td>GET /, /tasks, /about, /home &nbsp;|&nbsp; POST /add-task</td></tr>
    </table>
  </div>
</body>
</html>`;
  sendHTML(res, 200, html);
}

/** GET /home — Serve public/index.html using the FS module */
function handleHome(req, res) {
  const filePath = path.join(__dirname, 'public', 'index.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      // File-reading error handling
      if (err.code === 'ENOENT') {
        sendHTML(res, 404,
          '<h1>404 — File Not Found</h1><p>public/index.html does not exist.</p>');
      } else {
        sendHTML(res, 500,
          '<h1>500 — Internal Server Error</h1><p>Could not read file.</p>');
      }
      return;
    }
    sendHTML(res, 200, data);
  });
}

/** POST /add-task — Accept JSON body and add task to array */
async function handleAddTask(req, res) {
  let body;
  try {
    body = await parseJSONBody(req);
  } catch {
    // Invalid JSON
    return sendJSON(res, 400, {
      success: false,
      error: 'Invalid JSON in request body.',
    });
  }

  const { id, taskName, assignedTo, status } = body;

  // Validate required fields
  const missing = [];
  if (!id)         missing.push('id');
  if (!taskName)   missing.push('taskName');
  if (!assignedTo) missing.push('assignedTo');
  if (!status)     missing.push('status');

  if (missing.length > 0) {
    return sendJSON(res, 400, {
      success: false,
      error: `Missing required fields: ${missing.join(', ')}`,
    });
  }

  // Check for duplicate ID
  if (tasks.find(t => t.id == id)) {
    return sendJSON(res, 409, {
      success: false,
      error: `Task with id ${id} already exists.`,
    });
  }

  const newTask = { id, taskName, assignedTo, status };
  tasks.push(newTask);

  sendJSON(res, 201, {
    success: true,
    message: 'Task added successfully.',
    task: newTask,
    totalTasks: tasks.length,
  });
}

// ── Server ─────────────────────────────────────────────────────────────────

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  console.log(`[${new Date().toISOString()}] ${method} ${url}`);

  // Route: GET /
  if (method === 'GET' && url === '/') {
    return handleRoot(req, res);
  }

  // Route: GET /tasks
  if (method === 'GET' && url === '/tasks') {
    return handleGetTasks(req, res);
  }

  // Route: GET /about
  if (method === 'GET' && url === '/about') {
    return handleAbout(req, res);
  }

  // Route: GET /home
  if (method === 'GET' && url === '/home') {
    return handleHome(req, res);
  }

  // Route: POST /add-task
  if (method === 'POST' && url === '/add-task') {
    return await handleAddTask(req, res);
  }

  // 404 — Route not found
  sendJSON(res, 404, {
    success: false,
    error: `Route ${method} ${url} not found.`,
    availableRoutes: [
      'GET /',
      'GET /tasks',
      'GET /about',
      'GET /home',
      'POST /add-task',
    ],
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ HTTP Server running on http://localhost:${PORT}`);
  console.log('   Routes: GET /, /tasks, /about, /home | POST /add-task');
});
