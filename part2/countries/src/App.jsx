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

const Weather = ({ temp, wind, icon }) => {
  return (
    <div>
      <p>Temperature {temp} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
      <p>Wind {wind} m/s</p>
    </div>
  );
};

const ShowCountry = ({ onClick }) => {
  return <button onClick={onClick}>Show</button>;
};

const SingleCountry = ({
  name,
  capital,
  area,
  languages,
  flags,
  temp,
  wind,
  icon,
}) => {
  const lang = Object.values(languages);
  const listStyle = {
    margin: "0",
  };

  const imgStyle = {
    marginTop: "20px",
    border: "solid 1px",
  };
  return (
    <div>
      <h1>{name.common}</h1>
      <div>Capital {capital[0]}</div>
      <div>Area {area}</div>
      <h2>Languages</h2>{" "}
      <ul style={listStyle}>
        {lang.map((l, index) => (
          <li key={index}>{l}</li>
        ))}
      </ul>
      <img style={imgStyle} src={flags.png} alt={`Flag of ${name.common}`} />
      <h2>Weather in {capital[0]}</h2>
      <Weather temp={temp} wind={wind} icon={icon} />
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
  const [weatherData, setWeatherData] = useState(null);

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
      newServices.getWeather(filtercountries[0].capital).then((response) => {
        console.log(response);
        setWeatherData(response);
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
      ) : numRows === 1 && oneData && oneData.name && weatherData ? (
        <SingleCountry
          name={oneData.name}
          capital={oneData.capital}
          area={oneData.area}
          languages={oneData.languages}
          flags={oneData.flags}
          temp={weatherData.main.temp}
          wind={weatherData.wind.speed}
          icon={weatherData.weather[0].icon}
        />
      ) : (
        "Too many matches, specify another filter"
      )}
    </div>
  );
};

export default App;
