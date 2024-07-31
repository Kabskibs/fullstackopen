import { useMutation } from "@apollo/client";

import { ADD_BIRTHYEAR } from "../queries";
import { useState } from "react";

const SetBirthyear = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [addBirthyear] = useMutation(ADD_BIRTHYEAR);

  const submit = async (event) => {
    event.preventDefault();

    console.log(name, born);

    addBirthyear({ variables: { name, setBornTo: born } });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
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
