const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
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

const typeDefs = `
  type Book {
    title: String!
    author: Author!
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
      author: String!
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
    bookCount: async () => Book.collection.countDocuments(),
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
      if (!args.author && !args.genre) {
        return Book.find({});
      } else if (!args.author && args.genre) {
        return Book.find({ genres: args.genre });
      }
    },
    allAuthors: async (root, args) => {
      return await Author.find({});
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        const newAuthor = new Author({ name: args.author });
        author = await newAuthor.save();
      }
      const book = new Book({ ...args, author: author });
      return book.save();
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args });
      return author.save();
    },
    editAuthor: async (root, args) => {
      const filter = { name: args.name };
      const update = { born: args.setBornTo };
      const updatedAuthor = await Author.findOneAndUpdate(filter, update, {
        new: true,
      });
      return updatedAuthor;
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
