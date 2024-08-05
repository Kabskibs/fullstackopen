import patientsData from '../../data/patients';

import { Patient, NoSSNPatient } from '../types';

const getAllData = (): Patient[] => {
  return patientsData;
};

const getAllDataNoSSN = (): NoSSNPatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addDataEntry = () => {
  return null;
};

export default {
  getAllData,
  addDataEntry,
  getAllDataNoSSN
};