const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

morgan.token("type", (req, res) => JSON.stringify(req.body));

app.use(morgan("tiny", { skip: (req, res) => req.method === "POST" }));

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

app.post(
  "/api/persons/",
  morgan(":method :url :status :res[content-length] - :response-time ms :type"),
  (request, response) => {
    const body = request.body;
    const entry = {
      id: Math.floor(Math.random() * 100000).toString(),
      name: body.name,
      number: body.number,
    };

    const name_in_use = pb_entries.find((e) => e.name === body.name);
    const number_in_use = pb_entries.find((e) => e.number === body.number);

    if (!body.name) {
      return response.status(400).json({ error: "name is missing" });
    } else if (!body.number) {
      return response.status(400).json({ error: "number is missing" });
    } else if (name_in_use) {
      return response.status(400).json({ error: "name must be unique" });
    } else if (number_in_use) {
      return response.status(400).json({ error: "number must be unique" });
    } else {
      pb_entries = pb_entries.concat(entry);
      response.status(201).json(entry);
    }
  }
);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
