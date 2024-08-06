import { useEffect, useState } from 'react';
import axios from 'axios';

import { DiaryEntry } from './types';

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries').then(response => {
      setEntries(response.data);
    });
  }, []);

  return (
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
  );
};

export default App;
