const mongoose = require("mongoose");

if (process.argv.length < 3) {
  // if arguments are less than 3 no password given
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

// connection string to the database, replace <password> with the password
const url = `mongodb+srv://elmokappi_db_user:${password}@cluster0.6bqx93e.mongodb.net/phonebookApp?appName=Cluster0`;

// strictQuery means that only the fields defined in the schema are accepted in queries
// setting it to false allows for more flexible queries
mongoose.set("strictQuery", false);

mongoose.connect(url);

// defining the schema for a phonebook entry, with name and number fields
// id is automatically created by MongoDB as _id
const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
  important: Boolean,
});

// creating a model for the entries based on the schema
// model is a class that we can use to create and read documents from the database
const Entry = mongoose.model("Entry", entrySchema);

const entry = new Entry({
  name: process.argv[3],
  number: process.argv[4],
  important: true,
});

if (process.argv.length === 3) {
  Entry.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((entry) => {
      console.log(entry.name, entry.number);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  entry.save().then((result) => {
    console.log(`added ${entry.name} number ${entry.number} to phonebook`);
    mongoose.connection.close();
  });
}
