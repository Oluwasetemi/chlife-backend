const { GraphQLScalarType } = require('graphql');
const Hra = require('../models/hra');
const User = require('../models/user');
const Mealplan = require('../models/mealplan');
const Appointment = require('../models/appointment');
const Reward = require('../models/reward');
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
    appointments: async (parent) => {
      //  filter out the array of hra_id and try to populate it
      const appointmentList = JSON.parse(JSON.stringify(parent.appointments));
      const appointmentDataObject = [];
      for (const each of appointmentList) {
        const eachAppointment = await Appointment.findById(each);
        appointmentDataObject.push(JSON.parse(JSON.stringify(eachAppointment)));
      }
      return appointmentDataObject;
    },
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
    currentReward: async (parent) => {
      const reward = await Reward.findById(parent.currentReward);

      if (!reward) {
        // eslint-disable-next-line no-shadow
        const reward = null;
        return reward;
      }
      return reward;
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
    mealPlan: async (parent) => {
      const mealplan = await Mealplan.findById(parent.mealPlan);

      if (!mealplan) {
        // eslint-disable-next-line no-shadow
        const mealplan = null;
        return mealplan;
      }
      return mealplan;
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
