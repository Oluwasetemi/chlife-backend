const { verify } = require('../utils/auth');
const { findUserById, findAllUsers } = require('../services/user');

// all the query
const query = {
  async me(_, args, { req }) {
    try {
      // console.log(req);
      // console.log(req.headers.authorization);
      const token = req.headers.authorization;

      if (!token) {
        throw new Error("You're not logged in");
      }

      const { id } = await verify(token);

      if (id) {
        const user = await findUserById(id);

        if (!user) {
          throw new Error('No user found');
        }

        user.password = null;

        return user;
      }
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async users() {
    // this should be protected for only admin
    const users = await findAllUsers({});

    if (!users) {
      throw new Error('Users not found');
    }

    return users;
  },
  async usersByType(_, { type }) {
    // this should be protected for only admin
    const users = await findAllUsers({ type });

    if (!users) {
      throw new Error('Users not found');
    }

    return users;
  }
};

module.exports = query;
