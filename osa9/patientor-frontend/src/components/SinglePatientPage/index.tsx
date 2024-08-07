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

  if (patient) {  // Renders page if everything is correct (this is the main render)
    console.log('Patient: ', patient);
    console.log('Entries: ', patient.entries);
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
    const patientEntries = () => {
      if (patient.entries.length > 0) {
        return (
          <div>
            <h3>Entries:</h3>
            <div>
              {patient.entries.map((e) => (
                <div key={e.date}>
                  <b>{e.date}</b> - {e.description}
                </div>
              ))}
            </div>
            <div>
              <ul>
                {patient.entries.map((d) => (
                  d.diagnosisCodes ? (
                    d.diagnosisCodes.map((a) => (
                      <li>{a}</li>
                    ))
                  ) : (
                    null
                  )
                ))}
              </ul>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <h3>No entries found</h3>
          </div>
        );
      }
    };
    return (    // Main render return's here
      <div className="App">
        <div>
          <h2>
            {patient.name} {genderIcon()}
          </h2>
        </div>
        <div>
          <p>
            SSN: {patient.ssn}<br></br>
            Occupation: {patient.occupation}
          </p>
        </div>
        <div>
          {patientEntries()}
        </div>
      </div>
    );
  } else if (!id) {   // Used for backup if somehow ends up working, with no ID
    return (
      <div>
        ID not found
      </div>
    );
  } else {
    return (    // If data is still loading 
      <div>
        loading data...
      </div>
    );
  }
};

export default SinglePatientPage;