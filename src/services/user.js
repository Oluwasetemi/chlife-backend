const User = require('../models/user');

exports.createUser = data => User.create(data);

exports.findOneByEmail = email => User.findOne({ email });

exports.findOneBasedOnQuery = data => User.findOne(data);

exports.findBasedOnQuery = data => User.find(data);

exports.findUserById = id => User.findById(id);

exports.findAllUsers = (query = {}) => User.find(query);

exports.updateUser = (query, data) =>
  User.findOneAndUpdate(query, data, { new: true, runValidators: true });

exports.deleteUserByEmail = email => User.deleteOne({ email });

exports.search = searchParams =>
  User.find({
    $text: {
      $search: searchParams,
    },
    score: { $meta: 'textScore' },
  }).sort({ score: { $meta: 'textScore' } });
