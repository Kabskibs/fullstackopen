import { useState } from 'react'

const Button = ( {handleClick, text} ) => (
  <button onClick={handleClick}>{text}</button>
)

const Anecdotes = ( {anecdotes, selected, votes, clickNextAnecdote, clickVote} ) => (
  <>
    <h1>Anecdote of the day</h1>
    <p>{anecdotes[selected]}</p>
    <p>has {votes[selected]} votes</p>
    <div>
      <Button handleClick={clickNextAnecdote} text="next anecdote"></Button>
      <Button handleClick={clickVote} text={"vote"}></Button>
    </div>
  </>
)

const MostVotes = ( {anecdotes, votes, func} ) => (
  <>
  <h1>Anecdote with most votes</h1>
    <p>{anecdotes[func]}</p>
    <p>has {votes[func]} votes</p>
  </>
)

/* ---------------------------------------------- */

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const votesArr = new Array(anecdotes.length+1).join('0').split('').map(parseFloat)
  const [votes, addVotes] = useState(votesArr)

  const randomSelected = () => {
    let randomAnecdote = anecdotes[Math.floor(Math.random() * (anecdotes.length))]
    return anecdotes.indexOf(randomAnecdote)
  }

  const clickNextAnecdote = () => {
    setSelected(randomSelected)
  }

  const clickVote = () => {
    const copyVotes = [...votes]
    copyVotes[selected] = copyVotes[selected] + 1
    addVotes(copyVotes)
  }

  const getMaxValue = () => ( votes.indexOf(Math.max(...votes)) )

  return (
    <div>
        <Anecdotes anecdotes={anecdotes}
                    selected={selected}
                    votes={votes}
                    clickNextAnecdote={clickNextAnecdote}
                    clickVote={clickVote}
        />
        <MostVotes anecdotes={anecdotes} votes={votes} func={getMaxValue()}/>
    </div>
  )
}

export default App