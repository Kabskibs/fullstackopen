import diagnosesData from '../../data/diagnoses';

import { Diagnosis } from '../types';

const getAllData = (): Diagnosis[] => {
  return diagnosesData;
};

const addDataEntry = () => {
  return null;
};

export default {
  getAllData,
  addDataEntry
};