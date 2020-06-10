const User = require('../models/user');

exports.createUser = data => User.create(data);

exports.findOneByEmail = email => User.findOne({ email });

exports.findUserById = id => User.findById(id);

exports.findAllUsers = (query = {}) => User.find(query);
