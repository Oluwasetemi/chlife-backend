// all the subscription
const subscription = {
  notification: {
    subscribe: (parent, args, { pubsub }) =>
      pubsub.asyncIterator('new-notification'),
  },
};

module.exports = subscription;
