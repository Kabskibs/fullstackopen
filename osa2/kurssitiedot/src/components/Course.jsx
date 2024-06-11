const Header = (props) => ( <h2>{props.name}</h2> )

const Content = (props) => {
  const { parts } = props.parts
  return (
    <>
      {parts.map(c => <Part key={c.id} name={c.name} exercises={c.exercises}></Part>)}
      <Total parts={parts}/>
    </>
  )
}

const Part = (props) => ( <p>{props.name} {props.exercises}</p> )

const Total = (props) => {
  var sum = props.parts.reduce( (sum, i) => { return sum + i.exercises }, 0)
  return (
      <h4>total of {sum} exercises</h4>
  )
}

const Course = ( {courses} ) => {
  return (
    <>
      {courses.map(c =>
        <div key={c.id}>
          <Header key={c.id} name={c.name}/>
          <Content parts={c}/>
        </div>
      )}
    </>
  )
}

export default Course