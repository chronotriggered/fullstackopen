import { useState } from "react";

const Person = ({ name, number }) => {
  console.log(name);

  return (
    <div>
      {name} {number}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  console.log("New filter: ", newFilter);

  const filterResults = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter)
  );

  console.log("Filterobj: ", filterResults);

  const addNumber = (event) => {
    event.preventDefault();

    const personExists = persons.find((person) => person.name === newName);
    const numberExists = persons.find((person) => person.number === newNumber);

    if (numberExists) {
      alert(`Number ${newNumber} already exists.`);
    } else if (personExists) {
      if (personExists.number === newNumber) {
        alert(`${newName} with number ${newNumber} already exists`);
      } else if (newNumber) {
        const updatePersons = persons.map((person) =>
          person.name === newName ? { ...person, number: newNumber } : person
        );
        setPersons(updatePersons);
      } else {
        alert(`${newName} already exists`);
      }
    } else {
      const numberObj = {
        id: persons.length + 1,
        name: newName,
        number: newNumber || "",
      };
      setPersons(persons.concat(numberObj));
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value.trimStart());
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value.trimStart());
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value.trimStart().toLowerCase());
  };

  console.log(persons);

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        filter shown with
        <input value={newFilter} onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filterResults.map((person) => (
        <Person key={person.id} name={person.name} number={person.number} />
      ))}
    </div>
  );
};

export default App;
