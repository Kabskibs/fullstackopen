const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  const { parts } = props.parts
  return (
    <>
      {parts.map(c => <Part key={c.id} name={c.name} exercise={c.exercises}></Part>)}
      <Total parts={props.parts}/>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.name} {props.exercise}</p>
    </>
  )
}

const Total = (props) => {
  var sum = props.parts.parts.reduce( (sum, i) => { return sum + i.exercises }, 0)
  return (
      <h4>total of {sum} exercises</h4>
  )
}

const Course = (props) => {
  return (
    <>
      <Header course={props.course.name}/>
      <Content parts={props.course}/>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App