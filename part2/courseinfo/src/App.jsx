const Courses = (props) => {
  console.log("Courses:", props.courses);
  return (
    <div>
      <Course course={props.courses} />
    </div>
  );
};

const Course = (props) => {
  console.log("Course:", props);
  console.log("Props name:", props.course[0].name);

  return (
    <div>
      {props.course.map((course) => (
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total total={course.parts} />
        </div>
      ))}
    </div>
  );
};

const Header = (props) => <h1>{props.course}</h1>;

const Content = (props) => {
  console.log("Content:", props);

  return (
    <div>
      {props.parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Total = ({ total }) => {
  console.log("Total:", total);

  let total_amount = total.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <div>
      <b>total of {total_amount} exercises</b>
    </div>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      <Courses courses={courses} />
    </div>
  );
};

export default App;
