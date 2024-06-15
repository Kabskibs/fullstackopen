import { useEffect, useState } from 'react'

import personsService from './services/persons'

const Filter = props => <>filter shown with <input value={props.filter} onChange={props.onChange}/></>

const AddNew = props => {
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

const Numbers = props => {
  return (
    <>
      {props.persons.map(function(p) {
        if (p.name.toLowerCase().includes(props.filter.toLowerCase())) {
          return (
            <div key={p.name}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <Name key={p.name} name={p.name} number={p.number}></Name>
                    </td>
                    <td>
                      <DeletePerson id={p.id} deleteFunc={props.deletePerson}/>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )
        }
      })}
    </>
  )
}

const Name = props => ( <>{props.name} {props.number}<br></br></> )
const DeletePerson = props => <button onClick={ () => props.deleteFunc(props.id) }>delete</button>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect( () => {
    personsService
      .getAll()
      .then(responseData => {
        setPersons(responseData)
      })
  }, [])

  const resetFields = () => {
    setNewName('')
    setNewNumber('')
  }

  const addNewName = (event) => {
    event.preventDefault()
    const nameObject = {
        name: newName,
        number: newNumber,
    }
    if (persons.some( p => p['name'] === nameObject['name'] )) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updateNumber(nameObject)
        resetFields()
      } else {
        resetFields()
      }
    } else {
      personsService
        .create(nameObject)
        .then(responseData => {
          setPersons(persons.concat(responseData))
        })
      resetFields()
    }
  }

  const updateNumber = (nameObject) => {
      const person = persons.find(p => p.name === nameObject.name)
      const changedPerson = { ...person, number: nameObject.number}
      personsService
        .update(changedPerson)
        .then(responseData => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : responseData))
        })
  }

  const deletePerson = (id) => {
    if (confirm(`delete ${id} ?`)) {
      personsService
        .deleteById(id)
        .then(responseData => {
          setPersons(persons.filter((person) => person.id !== responseData.id))
        })
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
      <Numbers persons={persons} filter={filter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App