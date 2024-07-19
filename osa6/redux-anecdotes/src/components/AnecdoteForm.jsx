import { useDispatch } from "react-redux"
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const addNew = async (event) => {
    event.preventDefault()
    const content = event.target.anecdoteInput.value
    dispatch(newAnecdote(content))
    event.target.anecdoteInput.value = ''
    addNewNotification(content)
  }

  const addNewNotification = (anecdote) => {
    dispatch(setNotification(`anecdote added: '${anecdote}'`, 5))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div>
          <input name='anecdoteInput'/>
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm