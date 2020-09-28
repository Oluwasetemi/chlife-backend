const EmailSubscriber = require('../models/emailSubscribers');

exports.createEmailSubscriber = (data) => EmailSubscriber.create(data);

exports.findOneEmailSubscriberByEmail = (email) =>
  EmailSubscriber.findOne({ email });

exports.findOneBasedOnQuery = (data) => EmailSubscriber.findOne(data);

exports.findBasedOnQuery = (data) => EmailSubscriber.find(data);

exports.findEmailSubScriberById = (id) => EmailSubscriber.findById(id);

exports.findAllEmailSubscribers = (query = {}) => EmailSubscriber.find(query);

exports.removeEmailSubScriber = (id) => EmailSubscriber.findByIdAndRemove(id);

exports.updateEmailSubScriber = (query, data) =>
  EmailSubscriber.findOneAndUpdate(query, data, {
    new: true,
    runValidators: true,
  });

exports.deleteEmailSubScriberByEmail = (email) =>
  EmailSubscriber.deleteOne({ email });

exports.search = (searchParams) =>
  EmailSubscriber.find({
    $text: {
      $search: searchParams,
    },
    score: { $meta: 'textScore' },
  }).sort({ score: { $meta: 'textScore' } });
