import { useQuery } from "@apollo/client";

import { CURRENT_USER, BOOKS_BY_GENRE } from "../queries";
import { useEffect, useState } from "react";

const Recommend = ({ show, token }) => {
  const [genre, setGenre] = useState("");

  const userInfo = useQuery(CURRENT_USER, {
    skip: !token,
  });
  const booksByGenre = useQuery(BOOKS_BY_GENRE, {
    variables: { genre },
    skip: !token,
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (token) {
      userInfo.refetch();
    }
  }, [token]);

  useEffect(() => {
    if (userInfo.data) {
      setGenre(userInfo.data.me[0].favoriteGenre);
    }
  }, [userInfo]);

  if (userInfo.loading || booksByGenre.loading) {
    return <div>loading data...</div>;
  }

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <b>{genre}</b>
      <div>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {booksByGenre.data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Recommend;
