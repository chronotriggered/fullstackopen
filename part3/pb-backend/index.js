const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const Entry = require("./models/person");
const path = require("path");
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
    // entries_amount is defined here inside the callback function
    const request_date = new Date();
    response.send(
      `<p>Phonebook has info for ${entries_amount} people</p><p>${request_date}</p>`
    );
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Entry.findById(id)
    .then((entry) => {
      if (entry) {
        response.json(entry);
      } else {
        response.status(404).end(); // 404 Not Found
      }
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Entry.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

app.post(
  "/api/persons/",
  morgan(":method :url :status :res[content-length] - :response-time ms :type"),
  (request, response, next) => {
    // request body comes from express.json() middleware
    // request body contains the data sent by the client
    // in this case, the data is in json format and contains name and number
    const body = request.body;
    console.log("request body:", body);

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
    entry
      .save()
      .then((savedEntry) => {
        console.log("saved entry:", savedEntry);
        response.json(savedEntry);
      })
      .catch((error) => next(error)); // next is used to pass the error to the error handler middleware
  }
);

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number, important } = request.body;

  Entry.findById(request.params.id)
    .then((entry) => {
      if (!entry) {
        return response.status(404).end();
      }

      entry.name = name;
      entry.number = number;
      entry.important = important;

      return entry.save().then((updatedEntry) => {
        response.json(updatedEntry);
      });
    })
    .catch((error) => next(error));
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

const errorHandler = (error, request, response, next) => {
  // error handler has 4 parameters and it must be the last middleware
  console.error(error.message);

  if (error.name === "CastError") {
    // CastError occurs when id is malformed, e.g. not the right length for MongoDB ObjectId
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    // ValidationError occurs when mongoose schema validation fails
    return response.status(400).json({ error: error.message });
  }
  // pass the error to the default Express error handler
  // if we don't handle it here
  // default error handler will send a 500 Internal Server Error
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
console.log("PORT:", PORT);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
