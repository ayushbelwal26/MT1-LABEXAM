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
  { id: 1, taskName: 'Develop Login Page',     assignedTo: 'Rahul Sharma', status: 'Pending' },
  { id: 2, taskName: 'Design Database Schema', assignedTo: 'Priya Patel',  status: 'In Progress' },
  { id: 3, taskName: 'Write Unit Tests',        assignedTo: 'Ankit Verma',  status: 'Pending' },
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

/** Collect request body and parse as JSON */
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

/** GET / — Welcome message in HTML format */
function handleRoot(req, res) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Employee Task Management - Welcome</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #f0f2f5;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    .card {
      background: #ffffff;
      border-radius: 12px;
      padding: 40px 48px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      max-width: 600px;
      width: 90%;
      text-align: center;
    }
    h1 { color: #333333; margin-bottom: 12px; font-size: 2rem; }
    p { color: #666666; font-size: 1.05rem; line-height: 1.6; margin-bottom: 20px; }
    .badge {
      display: inline-block;
      background: #4a90e2;
      color: #ffffff;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 24px;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      gap: 16px;
      flex-wrap: wrap;
    }
    .nav-links a {
      color: #4a90e2;
      text-decoration: none;
      font-weight: 600;
      padding: 8px 16px;
      border: 1px solid #4a90e2;
      border-radius: 6px;
      transition: all 0.2s;
    }
    .nav-links a:hover {
      background: #4a90e2;
      color: #ffffff;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">Node.js HTTP Module &bull; Port 3000</div>
    <h1>Welcome to Employee Task Management System</h1>
    <p>This web application demonstrates the Node.js built-in HTTP module, routing, handling HTTP methods, and serving static files using the FS module.</p>
    <div class="nav-links">
      <a href="/tasks">View Tasks (JSON)</a>
      <a href="/about">About Application</a>
      <a href="/home">Home Page (FS)</a>
    </div>
  </div>
</body>
</html>`;
  sendHTML(res, 200, html);
}

/** GET /tasks — List of employee tasks in JSON format */
function handleGetTasks(req, res) {
  sendJSON(res, 200, tasks);
}

/** GET /about — Employee task management application information */
function handleAbout(req, res) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>About - Employee Task Management</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #f0f2f5;
      margin: 0;
      padding: 40px 20px;
      display: flex;
      justify-content: center;
    }
    .card {
      background: #ffffff;
      border-radius: 12px;
      padding: 36px 44px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      max-width: 650px;
      width: 100%;
    }
    h1 { color: #333333; margin-bottom: 20px; font-size: 1.8rem; border-bottom: 2px solid #4a90e2; padding-bottom: 10px; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    th, td { text-align: left; padding: 12px 14px; border-bottom: 1px solid #e0e0e0; font-size: 0.95rem; }
    th { color: #4a90e2; width: 35%; font-weight: 600; }
    td { color: #555555; }
    .back { display: inline-block; margin-top: 24px; color: #4a90e2; text-decoration: none; font-weight: 600; }
  </style>
</head>
<body>
  <div class="card">
    <h1>About Employee Task Management Application</h1>
    <table>
      <tr><th>Subject</th><td>Full Stack Development – Node.js Lab Examination</td></tr>
      <tr><th>Technology</th><td>Node.js, Built-in HTTP Module, Built-in FS Module</td></tr>
      <tr><th>Port</th><td>3000</td></tr>
      <tr><th>Module System</th><td>ES Modules (import / export)</td></tr>
      <tr><th>Database</th><td>Not Required (JavaScript Array in Memory)</td></tr>
      <tr><th>Implemented Routes</th><td>GET /, GET /tasks, GET /about, GET /home, POST /add-task</td></tr>
    </table>
    <a href="/" class="back">&larr; Back to Welcome Page</a>
  </div>
</body>
</html>`;
  sendHTML(res, 200, html);
}

/** GET /home — Serve HTML page using the FS module */
function handleHome(req, res) {
  const filePath = path.join(__dirname, 'public', 'index.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        sendHTML(res, 404, '<h1>404 - File Not Found</h1><p>index.html not found in public directory.</p>');
      } else {
        sendHTML(res, 500, '<h1>500 - Internal Server Error</h1><p>Error reading file.</p>');
      }
      return;
    }
    sendHTML(res, 200, data);
  });
}

/** POST /add-task — Accept task details in JSON format and add to array */
async function handleAddTask(req, res) {
  let body;
  try {
    body = await parseJSONBody(req);
  } catch {
    return sendJSON(res, 400, {
      message: 'Invalid JSON format in request body'
    });
  }

  const { id, taskName, assignedTo, status } = body;

  // Validate required fields: id, taskName, assignedTo and status
  if (id === undefined || !taskName || !assignedTo || !status) {
    return sendJSON(res, 400, {
      message: 'Validation failed: id, taskName, assignedTo and status are required fields'
    });
  }

  // Check duplicate ID
  const existing = tasks.find(t => t.id === Number(id));
  if (existing) {
    return sendJSON(res, 409, {
      message: `Task with ID ${id} already exists`
    });
  }

  const newTask = {
    id: Number(id),
    taskName,
    assignedTo,
    status
  };

  tasks.push(newTask);

  return sendJSON(res, 201, {
    message: 'Task added successfully',
    task: newTask
  });
}

// ── HTTP Server Creation ───────────────────────────────────────────────────

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

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

  // 404 - Invalid routes
  sendJSON(res, 404, {
    message: `Route ${method} ${url} not found`
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`HTTP Server running at http://localhost:${PORT}`);
});
