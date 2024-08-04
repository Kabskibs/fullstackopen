import express from 'express';

import { calculateBmi } from './bmiCalculator'
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;
  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).send({ error: 'malformatted parameters' }).end();
  }
  res.send(calculateBmi(Number(height), Number(weight)));
})

app.post('/exercises', (req, res) => {
  const target: number = req.body.target;
  const exerciseArray: number[] = req.body.daily_exercises;
  if (!target || !exerciseArray) {
    res.status(400).send({ error: 'parameters missing' }).end();
  } else if (typeof target !== 'number' || !Array.isArray(exerciseArray) || isNaN(target)) {
    res.status(400).send({ error: 'malformatted parameters' }).end();
  } else {
    try {
      res.send(calculateExercises(exerciseArray, target));
    } catch (error) {
      console.log('Error', error.message);
      res.status(500).send({ error: 'Something went wrong.' });
    }
  }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
