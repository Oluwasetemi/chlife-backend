const validator = require('validator');
const { findOneByEmail, createUser } = require('../services/user');
const { hash, match, sign } = require('../utils/auth');
const { send } = require('../mail/mail');

// all the mutation
const mutation = {
  async signup(_, args) {
    // validate the input that graphql will not validate
    const isEmail = validator.isEmail(args.input.email);

    if (!isEmail) {
      throw new Error('The email input is not a valid email');
    }
    // check if user exist on the platform before
    const userExists = await findOneByEmail(args.input.email);

    if (userExists) {
      throw new Error('Email taken, Please try another email');
    }

    // create user
    const name = `${args.input.firstName.trim()} ${args.input.lastName.trim()}`;

    const password = await hash(args.input.password);

    const user = await createUser({
      ...args.input,
      name,
      password,
      type: 'INDIVIDUAL'
    });

    if (!user) {
      throw new Error('User creation was not successful');
    }

    // send email to the new user
    await send({
      filename: 'individual_welcome',
      to: user.email,
      subject: 'Welcome to Choose Life',
      type: user.type,
      name: user.name
    });

    const result = { ...user._doc, password: null };

    // console.log(args);
    return result;
  },
  async login(_, args) {
    try {
      const userExist = await findOneByEmail(args.email);

      if (!userExist) {
        throw new Error('User with email not found');
      }

      // check password
      const matched = await match(args.password, userExist.password);

      if (!matched) {
        throw new Error('Incorrect password');
      }

      // generate token
      const token = await sign(userExist._id);

      if (!token) {
        throw new Error('Token generation error');
      }

      const result = { ...userExist._doc, token, password: null };

      return result;
    } catch (e) {
      throw new Error(e.message);
    }
  }
};

module.exports = mutation;
