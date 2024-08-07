import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientDataEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getAllDataNoSSN());
});

router.get('/:id', (req, res) => {
  res.send(patientsService.getDataByID(req.params.id));
});

router.post('/', (req, res) => {
  try {
    const newPatientDataEntry = toNewPatientDataEntry(req.body);
    const addedEntry = patientsService.addDataEntry(newPatientDataEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong! ';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;