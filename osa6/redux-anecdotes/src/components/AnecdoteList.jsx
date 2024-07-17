import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

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

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList