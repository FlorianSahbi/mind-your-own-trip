const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/myot', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});

const pointSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  profilePicture: String
}, { timestamps: true });

const placeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  preview: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  location: {
    type: pointSchema,
    required: true
  },
  addedBy: { type: Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Place = mongoose.model('Place', placeSchema);


const typeDefs = gql`

  type Point {
    _id: ID
    type: String
    coordinates: [Float]
  }
  type User {
    _id: ID
    firstName: String
    lastName: String
    profilePicture: String
  }
  type Place {
    _id: ID
    name: String
    country: String
    preview: String
    code: String
    location: Point
    addedBy: User
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
    getPlaces: [Place]
    getPlace(id: ID!): Place
  }
  type Mutation {
    createPlace(name: String, country: String, preview: String, code: String, addedBy: ID!, lng: Float, lat: Float): Place
    updatePlace(id: ID!, name: String, code: String, country: String, preview: String, lng: Float, lat: Float): Place
    deletePlace(id: ID!): Place
    createUser(firstName: String, lastName: String, profilePicture: String): User
    updateUser(id: ID!, firstName: String, lastName: String, profilePicture: String): User
    deleteUser(id: ID!): User
  }
`;

const resolvers = {
  Query: {
    getPlaces: async () => {
      return await Place.find({}).populate("addedBy").sort({ createdAt: -1 });
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
      const place = await new Place({ name: args.name, country: args.country, preview: args.preview, code: args.code, addedBy: args.addedBy, location: { coordinates: [args.lng, args.lat], type: "Point" } });
      place.save((err) => {
        if (err) {
          return console.error(err);
        }
      });
      return place;
    },
    updatePlace: async (parent, args, context, info) => {
      console.log(args)
      const place = await Place.findByIdAndUpdate({ _id: args.id }, { $set: { name: args.name, code: args.code, country: args.country, preview: args.preview, location: { coordinates: [args.lng, args.lat] } } }, { new: true, useFindAndModify: false });
      return place;
    },
    deletePlace: async (parent, args, context, info) => {
      const place = await Place.findByIdAndDelete(args.id)
      return place;
    },
    createUser: async (parent, args, context, info) => {
      const user = await new User({ firstName: args.firstName, lastName: args.lastName, profilePicture: args.profilePicture });
      user.save((err) => {
        if (err) {
          return console.error(err);
        }
      });
      return user;
    },
    updateUser: async (parent, args, context, info) => {
      console.log(args)
      const user = await User.findByIdAndUpdate({ _id: args.id }, { $set: { firstName: args.firstName, lastName: args.lastName, profilePicture: args.profilePicture } }, { new: true, useFindAndModify: false });
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
