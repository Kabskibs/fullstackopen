import { useQuery } from "@apollo/client";

import SetBirthyear from "./SetBirthyear";

import { ALL_AUTHORS } from "../queries";

const Authors = ({ show, token }) => {
  const authors = useQuery(ALL_AUTHORS);

  if (authors.loading) {
    return <div>loading data...</div>;
  }

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token ? <SetBirthyear authors={authors} /> : <></>}
    </div>
  );
};

export default Authors;
