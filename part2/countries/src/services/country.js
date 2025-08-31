import axios from "axios";

const api_key = import.meta.env.VITE_SOME_KEY;

const baseUrlAll = "https://studies.cs.helsinki.fi/restcountries/api/all";
const baseUrlOne = "https://studies.cs.helsinki.fi/restcountries/api/name";

const getAll = () => {
  const request = axios.get(baseUrlAll);
  return request.then((response) => response.data);
};

const getOne = (name) => {
  const request = axios.get(`${baseUrlOne}/${name}`);
  return request.then((response) => response.data);
};

const getWeather = (city) => {
  const request = axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
  );
  return request.then((response) => response.data);
};

export default { getAll, getOne, getWeather };
