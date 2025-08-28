import { useState, useEffect } from "react";
import newService from "./services/persons";

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with
      <input value={value} onChange={onChange} />
    </div>
  );
};

const PersonForm = ({ name, number, nameChange, numberChange, addNumber }) => {
  return (
    <form onSubmit={addNumber}>
      <div>
        name: <input value={name} onChange={nameChange} />
      </div>
      <div>
        number: <input value={number} onChange={numberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Person = ({ name, number, handleDelete }) => {
  return (
    <div>
      {name} {number} <button onClick={handleDelete}>delete</button>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    newService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const filterResults = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter)
  );

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
        newService
          .update(personExists.id, { ...personExists, number: newNumber })
          .then(
            (updatedPerson) =>
              setPersons(
                persons.map((person) =>
                  person.id !== updatedPerson.id ? person : updatedPerson
                )
              ),
            setNewName(""),
            setNewNumber("")
          );
      } else {
        alert(`${newName} already exists`);
      }
    } else {
      const numberObj = {
        name: newName,
        number: newNumber || "",
      };

      newService.create(numberObj).then((createdPerson) => {
        setPersons(persons.concat(createdPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value.trimStart());
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value.trimStart());
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value.trimStart().toLowerCase());
  };

  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`);
    if (confirmDelete) {
      const deletedPerson = persons.find((p) => p.id === id && p.name === name);
      newService.deletePerson(deletedPerson.id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        console.log(`Deleted: ${name}`);
      });
    } else {
      console.log(`Canceled deletion of ${name}`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        nameChange={handleNameChange}
        numberChange={handleNumberChange}
        addNumber={addNumber}
      />
      <h3>Numbers</h3>

      {filterResults.map((person) => (
        <Person
          key={person.id}
          name={person.name}
          number={person.number}
          handleDelete={() => handleDelete(person.id, person.name)}
        />
      ))}
    </div>
  );
};

export default App;
