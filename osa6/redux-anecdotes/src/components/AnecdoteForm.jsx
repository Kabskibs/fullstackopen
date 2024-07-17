import { useDispatch } from "react-redux"
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, nullNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const addNew = (event) => {
    event.preventDefault()
    const content = event.target.anecdoteInput.value
    event.target.anecdoteInput.value = ''
    dispatch(addAnecdote(content))
    addNewNotification(content)
  }

  const addNewNotification = (anecdote) => {
    dispatch(setNotification(`anecdote added: '${anecdote}'`))
    setTimeout(() => {
      dispatch(nullNotification())
    }, 5000);
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