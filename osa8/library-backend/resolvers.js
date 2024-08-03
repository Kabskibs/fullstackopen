const { GraphQLError, subscribe } = require("graphql");
const { PubSub } = require("graphql-subscriptions");
const jwt = require("jsonwebtoken");

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const author = await Author.findOne({ name: args.author });
      if (!args.author && !args.genre) {
        return Book.find({}).populate("author");
      } else if (!args.author && args.genre) {
        return Book.find({ genres: args.genre }).populate("author");
      } else if (args.author && !args.genre) {
        if (!author) {
          return [];
        }
        return Book.find({ author: author._id }).populate("author");
      } else {
        return Book.find({ author: author._id, genres: args.genre }).populate(
          "author"
        );
      }
    },
    allAuthors: async (root, args) => {
      return await Author.find({});
    },
    me: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("Not authenticated!", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      return await User.find({ username: context.currentUser.username });
    },
  },
  Author: {
    bookCount: async (root, args) =>
      Book.find({ author: root.id }).countDocuments(),
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("Not authenticated!", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        const newAuthor = new Author({ name: args.author });
        try {
          author = await newAuthor.save();
        } catch (error) {
          throw new GraphQLError("Adding new author failed!", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              error,
            },
          });
        }
      }
      const book = new Book({ ...args, author: author });
      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError("Adding new book failed!", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }
      pubsub.publish("BOOK_ADDED", { bookAdded: book });
      return book;
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args });
      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError("Adding new author failed!", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      return author;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("Not authenticated!", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const filter = { name: args.name };
      const update = { born: args.setBornTo };
      const updatedAuthor = await Author.findOneAndUpdate(filter, update, {
        new: true,
      });
      return updatedAuthor;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      return user.save().catch((error) => {
        throw new GraphQLError("Creating a new user failed!", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: [args.username],
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new GraphQLError("Invalid credentials!", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const userForToken = {
        username: args.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
