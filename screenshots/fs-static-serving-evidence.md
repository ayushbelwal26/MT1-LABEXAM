# GET /home — FS Module Static File Serving Evidence

## Route: GET /home

**Server:** HTTP Server on Port 3000  
**Implementation:** Uses Node.js built-in `fs.readFile()` to read `public/index.html`

### Successful Response

**Request:**
```
GET http://localhost:3000/home
```

**Response:**
- **Status:** 200 OK
- **Content-Type:** text/html
- **Body:** Contents of `public/index.html` (styled HTML page with task manager info)

### File Read Code (from httpServer.js)

```js
function handleHome(req, res) {
  const filePath = path.join(__dirname, 'public', 'index.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        sendHTML(res, 404, '<h1>404 — File Not Found</h1>');
      } else {
        sendHTML(res, 500, '<h1>500 — Internal Server Error</h1>');
      }
      return;
    }
    sendHTML(res, 200, data);
  });
}
```

### Error Handling

| Scenario           | HTTP Code | Description                         |
|--------------------|-----------|-------------------------------------|
| File found         | 200       | HTML served successfully            |
| File not found     | 404       | ENOENT error — file missing         |
| Other read error   | 500       | Internal server error               |

