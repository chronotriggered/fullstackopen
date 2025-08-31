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

const Notification = ({ message }) => {
  const notificationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: "15px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };
  if (message === null) {
    return null;
  }

  return <div style={notificationStyle}>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

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
      alert(`Number ${newNumber} already exists. Can't be duplicates.`);
    } else if (personExists) {
      const confirmNumber = window.confirm(
        `${newName} already exists. Do you want to change the number?`
      );
      if (confirmNumber) {
        newService
          .update(personExists.id, { ...personExists, number: newNumber })
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== updatedPerson.id ? person : updatedPerson
              )
            );
            setErrorMessage(`${personExists.name}'s number is now changed!`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              setErrorMessage(
                `Person ${personExists.name} has already been deleted from server.`
              );
              setTimeout(() => {
                setErrorMessage(null);
              }, 3000);
              setPersons(
                persons.filter((person) => person.id !== personExists.id)
              );
            } else {
              setErrorMessage(
                `Error deleting ${personExists.name}: ${error.message}`
              );
              setTimeout(() => {
                setErrorMessage(null);
              }, 3000);
            }
          });
      } else {
        console.log(`Number change canceled!`);
      }
    } else {
      const numberObj = {
        name: newName,
        number: newNumber || "",
      };

      newService.create(numberObj).then((createdPerson) => {
        setPersons(persons.concat(createdPerson));
        setErrorMessage(`${createdPerson.name} is now added!`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
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
      newService.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    } else {
      console.log(`Canceled deletion of ${name}`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
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
