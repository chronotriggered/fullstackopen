import { useState } from "react";

const Heading = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Vote = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Text = ({ maxVotes, votes }) => {
  return (
    <div>
      <p>{maxVotes}</p>
      <p>has {votes} votes</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0));

  const votingSystem = () => {
    const copy = [...vote];
    copy[selected] += 1;
    setVote(copy);
  };

  const random = () => {
    let index;
    do {
      index = Math.floor(Math.random() * anecdotes.length);
    } while (index === selected);
    return index;
  };

  const maxVoteIndex = () => {
    const copy = [...vote];
    let maxIndex = 0;
    for (let i = 1; i < copy.length; i++) {
      if (copy[i] > copy[maxIndex]) {
        maxIndex = i;
      }
    }
    return maxIndex;
  };

  const maxVotes = () => {
    let max = Math.max(...vote);
    return max;
  };

  return (
    <div>
      <Heading text="Anecdote of the day" />
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <Vote onClick={() => votingSystem()} text="vote" />
      <Button onClick={() => setSelected(random())} text="next anecdote" />
      <Heading text="Anecdote with most votes" />
      <Text maxVotes={anecdotes[maxVoteIndex()]} votes={maxVotes()} />
    </div>
  );
};

export default App;
