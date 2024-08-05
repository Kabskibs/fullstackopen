import { v1 as uuid } from 'uuid';

import patientsData from '../../data/patients';

import { Patient, NoSSNPatient, NewPatientEntry } from '../types';

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

const addDataEntry = (entry: NewPatientEntry): Patient => {
  const newId: string = uuid();
  const newDataEntry: Patient = {
    id: newId,
    ...entry
  };
  patientsData.push(newDataEntry);
  return newDataEntry;
};

export default {
  getAllData,
  addDataEntry,
  getAllDataNoSSN
};