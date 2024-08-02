import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { ALL_BOOKS, BOOKS_BY_GENRE } from "../queries";

const Books = (props) => {
  const [genre, setGenre] = useState("all");
  const [allGenres, setAllGenres] = useState([]);

  const books = useQuery(ALL_BOOKS);
  const booksByGenre = useQuery(BOOKS_BY_GENRE, {
    variables: { genre },
    skip: genre === "all",
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (!books.loading) {
      const genresMapped = books.data.allBooks.map((a) => a.genres);
      const genreArray = [...new Set(genresMapped.flat())];
      setAllGenres(genreArray);
    }
  }, [books]);

  if (books.loading || booksByGenre.loading) {
    return (
      <div>
        <div>
          <h2>books</h2>
        </div>
        <div>loading data...</div>
      </div>
    );
  }

  const selectGenre = () => {
    return (
      <>
        {allGenres.map((g) => (
          <button key={g} onClick={() => setGenre(g)}>
            {g}
          </button>
        ))}
        <button key="allgenres" onClick={() => setGenre("all")}>
          all genres
        </button>
      </>
    );
  };

  if (!props.show) {
    return null;
  }

  if (genre !== "all" && booksByGenre.data) {
    return (
      <div>
        <h2>books</h2>
        <div>
          in genre: <b>{genre}</b>
        </div>
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
        {selectGenre()}
      </div>
    );
  }

  return (
    <div>
      <h2>books</h2>
      <div>
        in genre: <b>{genre}</b>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectGenre()}
    </div>
  );
};

export default Books;
