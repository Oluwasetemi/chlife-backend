const User = require('../models/user');

exports.createUser = (data) => User.create(data);

exports.findOneByEmail = (email) => User.findOne({ email });

exports.findOneBasedOnQuery = (data) => User.findOne(data);

exports.findBasedOnQuery = (data) => User.find(data);

exports.findUserById = (id) => User.findById(id);

exports.findUsersByIds = async (ids) => {
  const result = [];
  for (const each of ids) {
    const user = await User.findById(each);

    delete user.password;
    result.push(user);
  }

  return result;
};

exports.findAllUsers = (query = {}) => User.find(query);

exports.removeUser = (id) => User.findByIdAndRemove(id);

exports.updateUser = (query, data) =>
  User.findOneAndUpdate(query, data, { new: true, runValidators: true });

exports.deleteUserByEmail = (email) => User.deleteOne({ email });

exports.search = async ({ searchInput, id }) => {
  const user = await User.find(
    { $text: { $search: searchInput }, company: id },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });

  return user;
};
