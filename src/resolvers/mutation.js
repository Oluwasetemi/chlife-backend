/* eslint-disable no-shadow */
/* eslint-disable camelcase */
const validator = require('validator');
const casual = require('casual');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const axios = require('axios').default;
const { readFileSync } = require('fs');
const path = require('path');
const FormData = require('form-data');
const request = require('request');
const hra = require('../models/hra');

const {
  urlGoogle,
  getGoogleAccountFromCode
} = require('../utils/google-oauth');

const {
  findOneByEmail,
  createUser,
  updateUser,
  findOneBasedOnQuery,
  deleteUserByEmail
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

      // const result = { ...user._doc, password: null };
      const result = { message: 'Company registered successfully' };

      // console.log(args);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async adminOnBoardCompany(_, args, { req }) {
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
        email: args.email
      });

      if (!userExist) {
        throw new Error(
          `User - ${(userExist && userExist.type) || ''} with email not found`
        );
      }

      // check password
      const matched = await match(args.password, userExist.password);

      if (!matched) {
        throw new Error('Incorrect password or email');
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
  async loginWithUserType(_, args) {
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

      await send({
        filename: 'request-reset',
        to: user.email,
        subject: 'Your Password Reset Token',
        name: user.name,
        resetLink: `${process.env.FRONTEND_URL}/reset?resetToken=${resetPasswordToken}`
      });

      return { message: 'Thanks. Request for Password Reset successful' };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async resendResetPasswordRequestMail(_, { email, resetPasswordToken }) {
    try {
      const user = await findOneBasedOnQuery({
        email,
        resetPasswordToken,
        resetPasswordExpires: { $gt: Date.now() }
      });

      if (!user) {
        throw new Error(`No such user found for email ${email}`);
      }

      // resend email
      await send({
        filename: 'request-reset',
        to: user.email,
        subject: 'Your Password Reset Token Resent',
        name: user.name,
        resetLink: `${process.env.FRONTEND_URL}/reset?resetToken=${resetPasswordToken}`
      });

      return { message: 'Thanks.Successful' };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async resetPassword(parent, { resetToken, password, confirmPassword }) {
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
      const hashedPassword = await hash(password);

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

      // 7. send mail notification
      await send({
        filename: 'reset-successful',
        to: user.email,
        subject: 'Password Reset Successful',
        name: user.name
      });

      // 8. return the new user
      return { ...updatedUser._doc, token, password: null };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async generateGoogleAuthUrl() {
    const url = await urlGoogle();

    if (!url) {
      throw new Error('Could not generate auth url');
    }

    return url;
  },
  async signupLoginWithGoogleCode(_, { code }) {
    const gUser = await getGoogleAccountFromCode(decodeURIComponent(code));

    let user;
    user = await findOneBasedOnQuery({
      email: gUser.email,
      source: 'GOOGLE'
    });

    if (user) {
      if (user.type !== 'INDIVIDUAL') {
        throw new Error(
          'User with this google account exist with another type.'
        );
      }

      const token = await sign(user._id);

      user = JSON.parse(JSON.stringify(user));
      delete user.password;

      return { ...user, token };
    }

    gUser.adminverified = true;
    gUser.password = await hash('123456');
    gUser.type = 'INDIVIDUAL';

    user = await createUser(gUser);

    const token = await sign(user._id);
    user = JSON.parse(JSON.stringify(user));

    delete user.password;

    return { ...user, token };
  },
  async signupLoginWithGoogleAccessToken(_, { access_token }) {
    const options = {
      method: 'GET',
      uri:
        'https://people.googleapis.com/v1/people/me?personFields=addresses,emailAddresses,photos,names,phoneNumbers',
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    };

    let me = await axios(options);
    me = JSON.parse(me);

    const gUser = {};
    gUser.email = me.emailAddresses[0].value;
    gUser.image = me.photos[0].url;
    gUser.name = me.names[0].displayName;

    let user;
    user = await findOneBasedOnQuery({
      email: gUser.email,
      source: 'GOOGLE'
    });

    if (user) {
      if (user.type !== 'INDIVIDUAL') {
        throw new Error(
          'User with this google account exist with another type.'
        );
      }

      const token = await sign(user._id);

      user = JSON.parse(JSON.stringify(user));
      delete user.password;

      return { ...user, token };
    }

    gUser.adminverified = true;
    gUser.password = await hash('123456');
    gUser.type = 'INDIVIDUAL';

    user = await createUser(gUser);

    const token = await sign(user._id);
    user = JSON.parse(JSON.stringify(user));

    delete user.password;

    return { ...user, token };
  },
  async addNewAdmin(_, { email }, { req }) {
    // check whether the user is of type admin
    if (!req.userId) {
      throw new Error('You must be logged In');
    }

    if (!req.user.type === 'SUPERADMIN') {
      throw new Error('You do not have the permission to do this');
    }

    // validate the input that graphql will not validate
    const isEmail = validator.isEmail(email);

    if (!isEmail) {
      throw new Error('The email input is not a valid email');
    }

    const randomBytesPromisified = promisify(randomBytes);
    const resetPasswordToken = (await randomBytesPromisified(20)).toString(
      'hex'
    );
    const resetPasswordExpires = Date.now() + 3600000; // 1 hr from now

    // create fake name and leave other details to false
    const newAdminData = {
      name: casual.name,
      email,
      gender: 'MALE',
      password: await hash(casual.password),
      resetPasswordToken,
      resetPasswordExpires,
      type: 'ADMIN',
      adminverified: true,
      invitedBy: req.userId
    };

    // create the new admin
    const user = await createUser(newAdminData);

    // send mail to the new admin to reset password
    await send({
      filename: 'add-new-admin',
      to: user.email,
      subject: 'Added to Choose Life as an Admin',
      name: user.name,
      resetLink: `${process.env.FRONTEND_URL}/reset?resetToken=${resetPasswordToken}`
    });

    return {
      message:
        'You have added a new admin to the choose Life. Tell him/her to Check his/her mail'
    };
  },
  async removeNewAdmin(_, { email }, { req }) {
    // check whether the user is of type admin
    if (!req.userId) {
      throw new Error('You must be logged In');
    }

    if (!req.user.type === 'SUPERADMIN') {
      throw new Error('You do not have the permission to do this');
    }

    // validate the input that graphql will not validate
    const isEmail = validator.isEmail(email);

    if (!isEmail) {
      throw new Error('The email input is not a valid email');
    }

    // check if the user exist and is an admin
    const user = await findOneByEmail(email);

    if (!user) {
      throw new Error('You with this email not found');
    }

    // remove
    await deleteUserByEmail(email);

    return {
      message: `You have removed <b>${email}</b> from the choose Life.`
    };
  },
  async submitHRAResponse(_, { input }, { req }) {
    console.log(input);
    // check whether the user is logged in
    if (!req.userId) {
      throw new Error('You must be logged In');
    }

    if (input.stage === 'RESPONSE') {
      const hraData = await hra.create({
        stage: input.stage,
        questionAndResponse: { ...input, stage: null },
        ghmReference: req.userId
      });

      // update the user with his current hra
      await updateUser({ _id: req.userId }, { $push: { hra: hraData._id } });

      return { message: 'Response Saved Successfully' };
    }

    if (input.stage === 'UPDATE_RESPONSE') {
      // await hra.findOneAndUpdate(
      //   { ghmReference: req.userId },
      //   {
      //     stage: input.stage,
      //     questionAndResponse: { ...input, stage: null }
      //   },
      //   { new: true, runValidators: true }
      // );
      const hraData = await hra.findOne({ ghmReference: req.userId });
      hraData.questionAndResponse = {
        ...hraData.questionAndResponse,
        ...input,
        stage: null
      };
      hraData.input = input.stage;

      await hraData.save();

      return { message: 'Response Updated Successfully' };
    }

    if (input.stage === 'PREVIEW') {
      // find by ghmReference
      // loop thru the data
      // add the prefix '' and suffix '' to the `questionAndResponse`
      // update the data using `ghmReference`
      return { message: 'All Response Reviewed', input };
    }

    if (input.stage === 'SUBMIT') {
      // confirm if the data is clean enough to be submitted
      // post it to ghm appraise_risk endpoint
      return { message: 'Response submitted', input };
    }
  }
};

module.exports = mutation;
