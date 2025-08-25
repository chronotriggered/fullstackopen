import { useState } from "react";

const Person = ({ name }) => {
  console.log(name);

  return name;
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addNumber = (event) => {
    event.preventDefault();
    console.log("Persons: ", persons);
    console.log("True or false: ", persons.includes(newName));

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} already in the phonebook`);
    } else {
      const numberObj = {
        name: newName,
      };
      setPersons(persons.concat(numberObj));
      setNewName("");
    }
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  console.log(persons);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>
          <Person name={person.name} />
        </div>
      ))}
    </div>
  );
};

export default App;
