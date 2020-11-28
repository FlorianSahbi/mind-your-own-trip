const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myot', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("hello")
});


const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  profilePicure: String
});

const placeSchema = new mongoose.Schema({
  // user: UserInterface;
  name: String,
  country: String,
  preview: String,
  code: String,
  // position: PositionInterface;
});

const User = mongoose.model('User', userSchema);
const Place = mongoose.model('Place', placeSchema);


const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    profilePicure: String
  }
  type Place {
    _id: ID
    name: String
    country: String
    preview: String
    code: String
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
    getPlaces: [Place]
    getPlace(id: ID!): Place
  }
  type Mutation {
    createPlace(name: String, country: String, preview: String, code: String ): Place
    updatePlace(id: ID!, name: String): Place
    deletePlace(id: ID!): Place
    createUser(firstName: String, lastName: String, country: String, code: String): User
    updateUser(id: ID!, firstName: String): User
    deleteUser(id: ID!): User
  }
`;

const resolvers = {
  Query: {
    getPlaces: async () => {
      return await Place.find({});
    },
    getPlace: async (parent, args, context, info) => {
      const user = await Place.findById(args.id);
      return await user;
    },
    getUsers: async () => {
      return await User.find({});

    },
    getUser: async (parent, args, context, info) => {
      const user = await User.findById(args.id);
      return await user;
    },
  },
  Mutation: {
    createPlace: async (parent, args, context, info) => {
      const place = await new Place({ name: args.name, country: args.country, preview: args.preview, code: args.code });
      place.save((err) => {
        if (err) {
          return console.error(err);
        }
      });
      return place;
    },
    updatePlace: async (parent, args, context, info) => {
      const place = await Place.findByIdAndUpdate(args.id, { name: args.name });
      return place;
    },
    deletePlace: async (parent, args, context, info) => {
      const place = await Place.findByIdAndDelete(args.id)
      return place;
    },
    createUser: async (parent, args, context, info) => {
      const user = await new User({ firstName: args.firstName, lastName: args.lastname, profilePicure: args.profilePicure });
      user.save((err) => {
        if (err) {
          return console.error(err);
        }
      });
      return user;
    },
    updateUser: async (parent, args, context, info) => {
      const user = await User.findByIdAndUpdate(args.id, { firstName: args.firstName });
      return user;
    },
    deleteUser: async (parent, args, context, info) => {
      const user = await User.findByIdAndDelete(args.id)
      return user;
    },
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
