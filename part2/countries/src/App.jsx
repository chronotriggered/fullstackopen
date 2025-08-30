import { useState, useEffect } from "react";
import newServices from "./services/country";

const CountryName = ({ name, onClick }) => {
  return (
    <div>
      {name.common}
      <ShowCountry onClick={onClick} />
    </div>
  );
};

const ShowCountry = ({ onClick }) => {
  return <button onClick={onClick}>Show</button>;
};

const SingleCountry = ({ name, capital, area, languages, flags }) => {
  const lang = Object.values(languages);
  const listStyle = {
    margin: "0",
  };

  const imgStyle = {
    marginTop: "20px",
  };
  return (
    <div>
      <h1>{name.common}</h1>
      <div>Capital {capital[0]}</div>
      <div>Area {area}</div>
      <h2>Languages</h2>{" "}
      {lang.map((l) => (
        <ul style={listStyle}>
          <li>{l}</li>
        </ul>
      ))}
      <img style={imgStyle} src={flags.png} alt={`Flag of ${name.common}`} />
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
  }, [filtercountries.length]);

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value.trimStart().toLowerCase());
  };

  const handleCountryChange = (name) => {
    setNewFilter(name.toLowerCase());
  };

  return (
    <div>
      <Filter value={newFilter} onChange={handleFilterChange} />
      {numRows < 10 && numRows > 1 ? (
        filtercountries.map((c, index) => (
          <CountryName
            key={index}
            name={c.name}
            onClick={() => handleCountryChange(c.name.common)}
          />
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
