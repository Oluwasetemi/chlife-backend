const Reward = require('../models/reward');

exports.createReward = data => Reward.create(data);

exports.findOneRewardByEmail = email => Reward.findOne({ email });

exports.findOneRewardBasedOnQuery = data => Reward.findOne(data);

exports.findRewardBasedOnQuery = data => Reward.find(data);

exports.findRewardById = id => Reward.findById(id);

exports.findAllRewards = (query = {}) => Reward.find(query);

exports.updateReward = (query, data) =>
  Reward.findOneAndUpdate(query, data, { new: true, runValidators: true });

exports.deleteRewardByEmail = email => Reward.deleteOne({ email });

exports.search = searchParams =>
  Reward.find({
    $text: {
      $search: searchParams,
    },
    { score : { $meta: "textScore" } },
  }).sort({ score : { $meta : 'textScore' } })
