import { useEffect, useState } from 'react'

import personsService from './services/persons'

const InfoMessage = (props) => {
  if (props.message === null) {
    return null
  }
  if (props.state === 0) {
    return (
      <div className='infomessageSuccess'>
        {props.message}
      </div>
    )
  } else if (props.state === -1) {
    return (
      <div className='infomessageFail'>
        {props.message}
      </div>
    )
  }
}

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
  const [infoMessage, setInfoMessage] = useState(null)
  const [infoState, setInfoState] = useState(0)

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
          setInfoMessage(`Added ${nameObject.name}`)
          setTimeout(() => {
            setInfoMessage(null)
          }, 5000) 
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
            setInfoMessage(`Updated ${nameObject.name}`)
            setTimeout(() => {
              setInfoMessage(null)
            }, 5000) 
        })
        .catch(error => {
          setInfoState(-1)
          setInfoMessage(`Information of ${nameObject.name} has already been removed from server`)
            setTimeout(() => {
              setInfoMessage(null)
              setInfoState(0)
            }, 5000) 
        })
  }

  const deletePerson = (id) => {
    if (confirm(`delete ${id} ?`)) {
      personsService
        .deleteById(id)
        .then(responseData => {
          setPersons(persons.filter((person) => person.id !== responseData.id))
          setInfoMessage(`Deleted ${responseData.name}`)
          setTimeout(() => {
            setInfoMessage(null)
          }, 5000) 
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
      <InfoMessage message={infoMessage} state={infoState}/>
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