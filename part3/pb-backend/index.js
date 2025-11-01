const express = require("express");
const app = express();

app.use(express.json());

let pb_entries = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons/", (request, response) => {
  response.json(pb_entries);
});

app.get("/info", (request, response) => {
  const entries_amount = pb_entries.length;
  const request_date = new Date();
  response.send(
    `<p>Phonebook has info for ${entries_amount} people</p><p>${request_date}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const entry = pb_entries.find((e) => e.id === id);
  if (entry) {
    response.json(entry);
  } else {
    response.status(204).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  pb_entries = pb_entries.filter((e) => e.id !== id);
  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
