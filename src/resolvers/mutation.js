const validator = require('validator');
const casual = require('casual');
const { randomBytes } = require('crypto');
const { promisify } = require('util');

const {
  findOneByEmail,
  createUser,
  updateUser,
  findOneBasedOnQuery
} = require('../services/user');
const { hash, match, sign } = require('../utils/auth');
const { send } = require('../mail/mail');

// all the mutation
const mutation = {
  async signup(_, args) {
    try {
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
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async registerCompany(_, args) {
    try {
      // validate the input that graphql will not validate
      const isEmail = validator.isEmail(args.input.organizationEmail);

      if (!isEmail) {
        throw new Error('The email input is not a valid email');
      }
      // check if user exist on the platform before
      const userExists = await findOneByEmail(args.input.organizationEmail);

      if (userExists) {
        throw new Error('Email taken, Please try another email');
      }

      // create user
      const name = `${args.input.firstName.trim()} ${args.input.lastName.trim()}`;

      const password = await hash(casual.password);

      // request reset password
      const randomBytesPromisified = promisify(randomBytes);
      const resetPasswordToken = (await randomBytesPromisified(20)).toString(
        'hex'
      );
      const resetPasswordExpires = Date.now() + 3600000; // 1 hr from now

      const user = await createUser({
        email: args.input.organizationEmail,
        company: args.input.organizationName,
        companyUrl: args.input.organizationUrl,
        address: args.input.organizationAddress,
        size: args.input.organizationSize,
        name,
        password,
        resetPasswordExpires,
        resetPasswordToken,
        type: 'COMPANY'
      });

      if (!user) {
        throw new Error('User creation was not successful');
      }

      // send email to the new company and reset their password
      await send({
        filename: 'company_welcome',
        to: user.email,
        subject: 'Welcome to Choose Life',
        type: user.type,
        name: user.name,
        resetPasswordExpires,
        resetLink: `${process.env.FRONTEND_URL}/reset?resetToken=${resetPasswordToken}`
      });

      const result = { ...user._doc, password: null };

      // console.log(args);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async login(_, args) {
    try {
      const userExist = await findOneBasedOnQuery({
        email: args.email,
        type: args.accountType
      });

      if (!userExist) {
        throw new Error(`User(${args.accountType || ''}) with email not found`);
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
  },
  async requestResetPassword(parent, { email }, ctx) {
    try {
      // 1. check if this is a real user
      const user = await findOneByEmail(email);

      if (!user) {
        throw new Error(`No such user found for email ${email}`);
      }
      // 2. set a reset token and expiry on that user
      const randomBytesPromisified = promisify(randomBytes);
      const resetPasswordToken = (await randomBytesPromisified(20)).toString(
        'hex'
      );
      const resetPasswordExpires = Date.now() + 3600000; // 1 hr from now
      const res = await updateUser(
        { email },
        { resetPasswordExpires, resetPasswordToken }
      );
      //   using nodemailer to test with mailtrap

      // 3. Email them that reset token
      // const mailRes = await transport.sendMail({
      //   from: 'temi@oluwasetemi.dev',
      //   to: [user.email],
      //   subject: 'Your Password Reset Token',
      //   html: makeANiceEmail(`
      //         Your password Reset Token is here! \n\n
      //         <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click here to Reset</a>.
      //         \n
      //         NB - Copy below otherwise ${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}
      //       `)
      // });

      await send({
        filename: 'request-reset',
        to: user.email,
        subject: 'Your Password Reset Token',
        name: user.name,
        resetLink: `${process.env.FRONTEND_URL}/reset?resetToken=${resetPasswordToken}`
      });

      return { message: 'Thanks. Reset successful' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  /* async resetPassword(parent, { resetToken, password, confirmPassword }) {
    try {
      // 1.check if the passwords match
      if (password !== confirmPassword) {
        throw new Error('password does not match');
      }

      // 2. check if its a legit reset Token
      // 3. check if its expired
      const user = await findOneBasedOnQuery({
        resetPasswordToken: resetToken,
        resetPasswordExpires: { $gt: Date.now() }
      });

      if (!user) {
        throw new Error('This token is either invalid or expired');
      }

      // 4. Hash their new password
      const hashedPassword = await hash(password, 10);

      // 5. Save the new password to the user and remove old resetToken fields
      const updatedUser = await updateUser(
        { email: user.email },
        {
          resetPasswordToken: null,
          resetPasswordExpires: null,
          password: hashedPassword
        }
      );
      // 6. Generate JWT
      const token = await sign(user.id);

      // 8. return the new user
      return { ...updatedUser._doc, token, password: null };
    } catch (error) {
      throw new Error(error.message);
    }
  } */
};

module.exports = mutation;
