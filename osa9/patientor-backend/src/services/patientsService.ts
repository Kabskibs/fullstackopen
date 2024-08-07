import { v1 as uuid } from 'uuid';

import patientsData from '../../data/patients';

import { Patient, NoSSNPatient, NewPatientEntry } from '../types';

const getAllData = (): Patient[] => {
  return patientsData;
};

const getDataByID = (id: string): Patient | string => {
  const patient = patientsData.find(patient => patient.id === id);
  if (!patient) {
    return (`No data found with this ID: ${id}`);
  }
  return patient;
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
  getDataByID,
  addDataEntry,
  getAllDataNoSSN
};