import { useEffect, useState } from 'react'
import axios from 'axios'

const Filter = (props) => ( <>filter shown with <input value={props.filter} onChange={props.onChange}/></> )

const AddNew = (props) => {
  return (
    <>
      <form>
        <div>
          name: <input value={props.newName} onChange={props.changeName}/><br></br>
          number: <input value={props.newNumber} onChange={props.changeNumber}/><br></br>
          <button type='submit' onClick={props.onClick}>add</button>
        </div>
      </form>
    </>
)
}

const Numbers = (props) => {
  return (
    <>
      {props.persons.map(function(p) {
        if (p.name.toLowerCase().includes(props.filter.toLowerCase())) {
          return <Name key={p.name} name={p.name} number={p.number}></Name>
        }
      })}
    </>
  )
}

const Name = (props) => ( <>{props.name} {props.number}<br></br></> )

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect( () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addNewName = (event) => {
    event.preventDefault()
    const nameObject = {
        name: newName,
        number: newNumber,
    }
    if (persons.some( p => p['name'] === nameObject['name'] )) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleInputChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleInputChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleInputChangeFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleInputChangeFilter}/>
      <h2>add a new</h2>
      <AddNew newName={newName} changeName={handleInputChangeName}
              newNumber={newNumber} changeNumber={handleInputChangeNumber}
              onClick={addNewName}/>
      <h2>Numbers</h2>
      <Numbers persons={persons} filter={filter}/>
    </div>
  )
}

export default App