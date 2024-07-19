import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    // These both work. Has to be used, since anecdotes is immutable
    // and filter mutates given array
    // const anecdotesToFilter = [...anecdotes]
    const anecdotesToFilter = anecdotes.toSorted()
    if (filter === '') {
      return anecdotesToFilter
    } else {
      const filteredAnecdotes = anecdotesToFilter.filter(p => {
        if (p.content.toLowerCase().includes(filter.toLowerCase())) {
          return p
        }
      })
      return filteredAnecdotes
    }
  })

  const vote = (id, anecdote) => {
    dispatch(voteAnecdote(id))
    voteNotification(anecdote)
  }

  const voteNotification = (anecdote) => {
    dispatch(setNotification(`you voted '${anecdote}'`, 5))
  }

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  return (
    <>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList