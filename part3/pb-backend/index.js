const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const Entry = require("./models/person");
const path = require("path");
const e = require("express");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

morgan.token("type", (req, res) => JSON.stringify(req.body));

app.use(morgan("tiny", { skip: (req, res) => req.method === "POST" }));

app.get("/api/persons/", (request, response) => {
  Entry.find({}).then((entry) => {
    response.json(entry);
  });
});

app.get("/info", (request, response) => {
  Entry.countDocuments({}).then((entries_amount) => {
    const request_date = new Date();
    response.send(
      `<p>Phonebook has info for ${entries_amount} people</p><p>${request_date}</p>`
    );
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Entry.findById(id).then((entry) => {
    if (entry) {
      response.json(entry);
    } else {
      response.status(204).end();
    }
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Entry.findByIdAndRemove(id).then(() => {
    response.status(204).end();
  });
});

app.post(
  "/api/persons/",
  morgan(":method :url :status :res[content-length] - :response-time ms :type"),
  (request, response) => {
    // request body comes from express.json() middleware
    // request body contains the data sent by the client
    // in this case, the data is in json format and contains name and number
    const body = request.body;

    if (!body.name) {
      return response.status(400).json({ error: "name is missing" });
    } else if (!body.number) {
      return response.status(400).json({ error: "number is missing" });
    }

    // entry with small e refers to the mongoose model
    // Entry with big E refers to the model imported at the top
    // model in mongoose is like a table in sql
    // each instance of a model is like a row in sql
    // sql is relational, mongoose is non-relational
    const entry = new Entry({
      name: body.name,
      number: body.number,
    });

    // sending back the saved entry as json to the client
    // client could be postman, browser, react app, etc.
    // axios automatically converts json to js object for the react app
    // callback function without arrow is made like this:
    // function(savedEntry) { response.json(savedEntry); }
    // function name in this case is null because it's an anonymous function
    // saevedEntry is the entry after being saved to the database
    entry.save().then((savedEntry) => {
      response.json(savedEntry);
    });
  }
);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
