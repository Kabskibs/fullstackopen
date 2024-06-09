import { useState } from 'react'

const Button = ( { handleClick, text } ) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  const average = () => {
    let g = props.good * 1
    let b = props.bad * -1
    return (g + b) / all 
  }
  const goodPercentage = () => {return <>{(props.good / all * 100)} %</>}
  if (all == 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
    <table>
      <tbody>
            <StatisticsLine text="good" value={props.good}/>
            <StatisticsLine text="neutral" value={props.neutral}/>
            <StatisticsLine text="bad" value={props.bad}/>
            <StatisticsLine text="all" value={all}/>
            <StatisticsLine text="average" value={average()}/>
            <StatisticsLine text="positive" value={goodPercentage()}/>
      </tbody>
    </table>
    </>
  )
}

const StatisticsLine = ( { text, value } ) => (
  <>
    <tr><td>{text}</td><td>{value}</td></tr>
  </>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickSetGood = () => setGood(good + 1)
  const clickSetNeutral = () => setNeutral(neutral + 1)
  const clickSetBad = () => setBad(bad + 1)

  console.log('good', good)
  console.log('neutral', neutral)
  console.log('bad', bad)
  return (
    <div>
      <>
        <h1>give feedback</h1>
        <Button handleClick={clickSetGood} text='good'/>
        <Button handleClick={clickSetNeutral} text='neutral'/>
        <Button handleClick={clickSetBad} text='bad'/>
      </>
      <>
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </>
    </div>
  )
}

export default App