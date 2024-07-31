import { useMutation } from "@apollo/client";

import { ADD_BIRTHYEAR } from "../queries";
import { useRef, useState } from "react";

const SetBirthyear = ({ authors }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [addBirthyear] = useMutation(ADD_BIRTHYEAR);

  const submit = async (event) => {
    event.preventDefault();

    addBirthyear({ variables: { name, setBornTo: born } });

    nameSelect.current.value = "";
    setName("");
    setBorn("");
  };

  const nameSelect = useRef();

  const selectName = () => {
    const names = authors.data.allAuthors.map((author) => author.name);
    return (
      <div>
        name
        <select
          ref={nameSelect}
          onChange={({ target }) => setName(target.value)}
        >
          <option></option>
          {names.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>{selectName()}</div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default SetBirthyear;
