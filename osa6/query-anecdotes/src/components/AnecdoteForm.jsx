import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'

import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: () => {
      setErrorNotification()
    }
  })

  const setNotification = message => {
    if (message.length > 4) {
      dispatch({
        type: "SET_NOTIFICATION",
        message: `anecdote '${message}' created`
      })
      setTimeout(() => {
        dispatch({ type: "NULL_NOTIFICATION" })
      }, 5000)
    }
  }

  const setErrorNotification = () => {
    dispatch({
      type: "SET_NOTIFICATION",
      message: "anecdote must be at least 5 characters long"
    })
    setTimeout(() => {
      dispatch({ type: "NULL_NOTIFICATION" })
    }, 5000);
  }

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate({ content, votes: 0 })
    setNotification(content)
    event.target.anecdote.value = ''
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
