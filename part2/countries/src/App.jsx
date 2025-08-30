import { useState, useEffect } from "react";
import newServices from "./services/country";

const CountryName = ({ name }) => {
  return <div>{name.common}</div>;
};

const SingleCountry = ({ name, capital, area, languages, flags }) => {
  return (
    <div>
      <p>Name: {name.common}</p>
      <p>Capital: {capital[0]}</p>
      <p>Area: {area}</p>
      <p>Languages: {Object.values(languages).join(", ")}</p>
      <img src={flags.png} alt={`Flag of ${name.common}`} />
    </div>
  );
};

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with
      <input value={value} onChange={onChange} />
    </div>
  );
};

const App = () => {
  const [newData, setData] = useState([]);
  const [oneData, setOneData] = useState(null);
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    newServices.getAll().then((response) => {
      setData(response);
    });
  }, []);

  const filtercountries = newData.filter((d) =>
    d.name.common.toLowerCase().includes(newFilter)
  );
  const numRows = filtercountries.length;

  useEffect(() => {
    if (numRows === 1) {
      newServices.getOne(filtercountries[0].name.common).then((response) => {
        setOneData(response);
      });
    } else {
      setOneData(null);
    }
  }, [numRows]);

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value.trimStart().toLowerCase());
  };

  return (
    <div>
      <Filter value={newFilter} onChange={handleFilterChange} />
      {numRows < 10 && numRows > 1 ? (
        filtercountries.map((c, index) => (
          <CountryName key={index} name={c.name} />
        ))
      ) : numRows === 1 && oneData && oneData.name ? (
        <SingleCountry
          name={oneData.name}
          capital={oneData.capital}
          area={oneData.area}
          languages={oneData.languages}
          flags={oneData.flags}
        />
      ) : (
        "Too many matches, specify another filter"
      )}
    </div>
  );
};

export default App;
