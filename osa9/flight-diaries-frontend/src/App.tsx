import { useEffect, useState } from 'react';
import axios from 'axios';

import { DiaryEntry, NewDiaryEntry } from './types';

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [newEntryDate, setNewEntryDate] = useState('');
  const [newEntryWeather, setNewEntryWeather] = useState('');
  const [newEntryVisibility, setNewEntryVisibility] = useState('');
  const [newEntryComment, setNewEntryComment] = useState('');

  const baseUrl = 'http://localhost:3000/api/diaries';

  useEffect(() => {
    axios.get<DiaryEntry[]>(baseUrl).then(response => {
      setEntries(response.data);
    });
  }, []);

  const resetFields = () => {
    setNewEntryDate('');
    setNewEntryWeather('');
    setNewEntryVisibility('');
    setNewEntryComment('');
  };

  const addNewEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const entryToPost: NewDiaryEntry = {
      date: newEntryDate,
      weather: newEntryWeather,
      visibility: newEntryVisibility,
      comment: newEntryComment
    };
    axios
      .post<DiaryEntry>(baseUrl, entryToPost)
      .then(response => {
        setEntries(entries.concat(response.data));
      });
    resetFields();
  };

  return (
    <div>
      <div>
        <h2>Add new entry</h2>
        <form onSubmit={addNewEntry}>
          date
          <input
            value={newEntryDate}
            onChange={(event) => setNewEntryDate(event.target.value)}
          /><br></br>
          visibility
          <input
            value={newEntryVisibility}
            onChange={(event) => setNewEntryVisibility(event.target.value)}
          /><br></br>
          weather
          <input
            value={newEntryWeather}
            onChange={(event) => setNewEntryWeather(event.target.value)}
          /><br></br>
          comment
          <input
            value={newEntryComment}
            onChange={(event) => setNewEntryComment(event.target.value)}
          /><br></br>
          <button type='submit'>add</button>
        </form>
      </div>
      <div>
        <h2>Diary Entries</h2>
        {entries.map((e) => (
          <div key={e.id}>
            <h3>{e.date}</h3>
            visibility: {e.visibility}<br></br>
            weather: {e.weather}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
