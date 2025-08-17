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
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={good + neutral + bad} />
      <Statistic text="average" value={(good - bad) / (good + neutral + bad)} />
      <Statistic
        text="positive"
        value={(good / (good + neutral + bad)) * 100}
      />
    </div>
  );
};

const Statistic = ({ text, value }) => {
  return (
    <div>
      {text}: {text === "positive" ? `${value} %` : value}
    </div>
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
