const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
// const { v1: uuid } = require("uuid");
const { GraphQLError } = require("graphql");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Author = require("./models/author");
const Book = require("./models/book");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error.message);
  });

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

// `author: Author!` removed from Book, for testing purposes
// `author: String!` removed from Mutation AddBook, for testing purposes
// These must be added back later

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    genres: [String]!
    id: ID!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      genres: [String!]!
    ): Book!

    addAuthor(
      name: String!
      born: Int
      bookCount: Int
    ): Author!

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    // bookCount: () => books.length,
    bookCount: async () => Book.collection.countDocuments(),
    // authorCount: () => authors.length,
    authorCount: async () => Author.collection.countDocuments(),
    /* allBooks: (root, args) => {
      if (!args.author && !args.genre) {
        return books;
      } else if (args.author && !args.genre) {
        return books.filter((book) => book.author === args.author);
      } else if (!args.author && args.genre) {
        return books.filter((book) => book.genres.includes(args.genre));
      } else {
        const byAuthor = books.filter((book) => book.author === args.author);
        return byAuthor.filter((book) => book.genres.includes(args.genre));
      }
    }, */
    allBooks: async (root, args) => {
      return Book.find({});
    },
    /* allAuthors: (root, args) => {
      return authors.map((author) => ({
        ...author,
        bookCount: books.filter((book) => book.author === author.name).length,
      }));
    }, */
    allAuthors: async (root, args) => {
      return Author.find({});
    },
  },
  Mutation: {
    /* addBook: (root, args) => {
      if (!authors.find((author) => author.name === args.author)) {
        const author = { name: args.author, id: uuid() };
        authors = authors.concat(author);
      }
      const book = { ...args, id: uuid() };
      books = books.concat(book);
      return book;
    }, */
    addBook: async (root, args) => {
      /* const authorFind = await Author.findOne({ name: args.author });
      if (!authorFind) {
        const author = new Author({ name: args.author });
        author.save();
      } */
      const book = new Book({ ...args });
      return book.save();
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args });
      return author.save();
    },
    editAuthor: (root, args) => {
      const index = authors.findIndex((author) => author.name === args.name);
      if (index === -1) {
        throw new GraphQLError("No author found", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        });
      }
      authors[index].born = args.setBornTo;
      return authors[index];
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
