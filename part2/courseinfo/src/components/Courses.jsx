const Courses = (props) => {
  console.log("Courses:", props.courses);
  return (
    <div>
      <h1>Web development curriculum</h1>
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

export { Courses };
