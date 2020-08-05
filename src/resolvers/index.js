const { GraphQLScalarType } = require('graphql');
const Hra = require('../models/hra');
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
    parseValue: value => new Date(value),
    serialize: value => new Date(value).toISOString(),
    parseLiteral: ast => ast.value,
  }),
  User: {
    hra: async parent => {
      //  filter out the array of hra_id and try to populate it
      const hraList = JSON.parse(JSON.stringify(parent.hra));
      const hraDataObject = [];
      for (const each of hraList) {
        const eachHra = await Hra.findById(each);
        hraDataObject.push(JSON.parse(JSON.stringify(eachHra)));
      }
      return hraDataObject;
    },
    currentHra: async parent => Hra.findById(parent.currentHra),
  },
};

module.exports = resolvers;
