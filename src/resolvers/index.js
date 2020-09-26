const { GraphQLScalarType } = require('graphql');
const Hra = require('../models/hra');
const User = require('../models/user');
const Mutation = require('./mutation');
const Query = require('./query');
const Subscription = require('./subscription');

const resolvers = {
  Mutation,
  Query,
  Subscription,
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'A valid date time value.',
    parseValue: (value) => new Date(value),
    serialize: (value) => new Date(value).toISOString(),
    parseLiteral: (ast) => ast.value,
  }),
  User: {
    hra: async (parent) => {
      //  filter out the array of hra_id and try to populate it
      const hraList = JSON.parse(JSON.stringify(parent.hra));
      const hraDataObject = [];
      for (const each of hraList) {
        const eachHra = await Hra.findById(each);
        hraDataObject.push(JSON.parse(JSON.stringify(eachHra)));
      }
      return hraDataObject;
    },
    currentHra: async (parent) => {
      const hra = await Hra.findById(parent.currentHra);

      if (!hra) {
        // eslint-disable-next-line no-shadow
        const hra = null;
        return hra;
      }
      return hra;
    },
    company: async (parent) => {
      const user = await User.findById(parent.company);

      if (!user) {
        // eslint-disable-next-line no-shadow
        const user = null;
        return user;
      }
      return user;
    },
  },
  UserWithCount: {
    __resolveType(obj, context, info) {
      if (obj.type) {
        return 'User';
      }

      if (obj.totalCount) {
        return 'AddCountToUser';
      }

      return null;
    },
  },
};

module.exports = resolvers;
