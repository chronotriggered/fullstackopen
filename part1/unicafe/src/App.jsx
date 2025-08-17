import { useState } from "react";

const Heading = (props) => {
  return (
    <div>
      <h1>{props.heading}</h1>
    </div>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad == 0) {
    return <p>No feedback given</p>;
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={good + neutral + bad} />
          <StatisticLine
            text="average"
            value={(good - bad) / (good + neutral + bad)}
          />
          <StatisticLine
            text="positive"
            value={(good / (good + neutral + bad)) * 100}
          />
        </tbody>
      </table>
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}:</td>
      <td>
        {text === "positive" || text === "average"
          ? `${value.toFixed(3)}`
          : value}
        {text === "positive" ? " %" : ""}
      </td>
    </tr>
  );
};

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Heading heading="give feedback" />
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Heading heading="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
