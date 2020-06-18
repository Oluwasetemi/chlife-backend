const User = require('../models/user');

exports.createUser = data => User.create(data);

exports.findOneByEmail = email => User.findOne({ email });

exports.findOneBasedOnQuery = data => User.findOne(data);

exports.findUserById = id => User.findById(id);

exports.findAllUsers = (query = {}) => User.find(query);

exports.updateUser = (query, data) =>
  User.findOneAndUpdate(query, data, { new: true, runValidators: true });

exports.deleteUserByEmail = email => User.deleteOne({ email });
