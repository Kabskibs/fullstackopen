import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { Patient } from "../../types";

import patientService from "../../services/patients";

const SinglePatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const response = await patientService.getById(id);
        setPatient(response);
      }
    };
    void fetchPatient();
  }, [id]);

  if (patient) {
    const genderIcon = () => {
      if (patient.gender === 'male') {
        return (
          <MaleIcon />
        );
      } else if (patient.gender === 'female') {
        return (
          <FemaleIcon />
        );
      } else {
        return (
          <TransgenderIcon />
        );
      }
    };
    return (
      <div className="App">
        <h2>
          {patient.name} {genderIcon()}
        </h2>
        <p>
          SSN: {patient.ssn}<br></br>
          Occupation: {patient.occupation}
        </p>
      </div>
    );
  } else if (!id) {
    return (
      <div>
        ID not found
      </div>
    );
  } else {
    return (
      <div>
        loading data...
      </div>
    );
  }
};

export default SinglePatientPage;