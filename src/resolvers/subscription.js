// all the subscription
const subscription = {
  notification: {
    subscribe: (parent, args, { pubsub }) => {
      console.log(args);
      console.log(parent);
      console.log(pubsub);
      return pubsub.asyncIterator('new-notification');
    },
  },
};

module.exports = subscription;
