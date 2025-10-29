const express = require("express");
const app = express();

let notes = [
  { id: 1, content: "HTML is easy", important: true },
  { id: 2, content: "Browser can execute only JavaScript", important: false },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
  {
    id: 4,
    content: "Express is a framework for building web applications in Node.js",
    important: true,
  },
  {
    id: 5,
    content:
      "Middleware functions are functions that have access to the request object",
    important: false,
  },
  {
    id: 6,
    content: "The app.listen function starts a server",
    important: true,
  },
];

app.get("/", (request, response) => {
  // '/' in this context means the root route, i.e., http://localhost:3001/
  response.send("<h1>Hello World!</h1>"); // send() method sends the HTTP response back to the client which is making the request
});

app.get("/api/notes", (request, response) => {
  // '/api/notes' is the route for accessing notes (http://localhost:3001/api/notes)
  response.json(notes); // json method sends a JSON response to the client (same as res.send() but also sets the Content-Type header to application/json
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
