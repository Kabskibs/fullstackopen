import { useEffect, useState } from 'react';
import axios from 'axios';

import { DiaryEntry, NewDiaryEntry } from './types';

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [newEntryDate, setNewEntryDate] = useState('');
  const [newEntryWeather, setNewEntryWeather] = useState('');
  const [newEntryVisibility, setNewEntryVisibility] = useState('');
  const [newEntryComment, setNewEntryComment] = useState('');
  const [notification, setNotification] = useState('');

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

  const toggleNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 5000);
  };

  const isBackendError = (data: unknown): data is string => {
    return typeof data === 'string' || data instanceof String;
  };

  const addNewEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const entryToPost: NewDiaryEntry = {
      date: newEntryDate,
      weather: newEntryWeather,
      visibility: newEntryVisibility,
      comment: newEntryComment
    };
    try {
      const response = await axios.post(baseUrl, entryToPost);
      setEntries(entries.concat(response.data));
      resetFields();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (isBackendError(error.response.data)) {
            toggleNotification(error.response.data);
          } else {
            toggleNotification('Error: Error response data malformatted');
          }
        } else {
          toggleNotification(`Error: No error response data: ${error}`);
        }
      } else {
        toggleNotification('Something went wrong.');
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div>
        <h2>Add new entry</h2>
        <div style={{ color: 'red' }}>
          {notification === '' ? (
            <></>
          ) : (
            notification
          )}
        </div>
        <div>
          <form onSubmit={addNewEntry}>
            date
            <input
              type='date'
              value={newEntryDate}
              onChange={(event) => setNewEntryDate(event.target.value)}
            /><br></br>
            <div>
              visibility
              great
              <input
                type='radio'
                name='visibility'
                onChange={() => setNewEntryVisibility('great')}
              />
              good
              <input
                type='radio'
                name='visibility'
                onChange={() => setNewEntryVisibility('good')}
              />
              ok
              <input
                type='radio'
                name='visibility'
                onChange={() => setNewEntryVisibility('ok')}
              />
              poor
              <input
                type='radio'
                name='visibility'
                onChange={() => setNewEntryVisibility('poor')}
              />
            </div>
            <div>
              weather
              sunny
              <input
                type='radio'
                name='weather'
                onChange={() => setNewEntryWeather('sunny')}
              />
              rainy
              <input
                type='radio'
                name='weather'
                onChange={() => setNewEntryWeather('rainy')}
              />
              cloudy
              <input
                type='radio'
                name='weather'
                onChange={() => setNewEntryWeather('cloudy')}
              />
              stormy
              <input
                type='radio'
                name='weather'
                onChange={() => setNewEntryWeather('stormy')}
              />
              windy
              <input
                type='radio'
                name='weather'
                onChange={() => setNewEntryWeather('windy')}
              />
            </div>
            comment
            <input
              value={newEntryComment}
              onChange={(event) => setNewEntryComment(event.target.value)}
            /><br></br>
            <button type='submit'>add</button>
          </form>
        </div>
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
