/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
const validator = require('validator');
const casual = require('casual');
const { format, differenceInCalendarDays } = require('date-fns');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const axios = require('axios').default;
const request = require('request');

const hra = require('../models/hra');

const requestPromise = promisify(request);

const GHM_BASE_API =
  process.env.NODE_ENV === 'production'
    ? process.env.GHM_PRODUCTION
    : process.env.GHM_TEST;

const {
  urlGoogle,
  getGoogleAccountFromCode,
} = require('../utils/google-oauth');

const {
  findOneByEmail,
  createUser,
  updateUser,
  findOneBasedOnQuery,
  deleteUserByEmail,
  findUserById,
  removeUser,
  findAllUsers,
  findUserByIdPopulated,
} = require('../services/user');

const {
  createReward,
  updateReward,
  findAllRewards,
  findRewardById,
} = require('../services/reward');

const { hash, match, sign } = require('../utils/auth');
const { send } = require('../mail/mail');
const { createAppointment } = require('../services/appointment');
const {
  createEmailSubscriber,
  updateEmailSubScriber,
  findOneEmailSubscriberByEmail,
  findEmailSubScriberById,
} = require('../services/emailSubscriber');

const { clean } = require('../utils/helpers');

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
        type: 'INDIVIDUAL',
      });

      if (!user) {
        throw new Error('User creation was not successful');
      }

      // generate token
      const token = await sign(user._id);

      if (!token) {
        throw new Error('Token generation error');
      }

      // send email to the new user
      await send({
        filename: 'individual_welcome',
        to: user.email,
        subject: 'Welcome to Choose Life',
        type: user.type,
        name: user.name,
      });

      const result = { ...user._doc, password: null, token };

      // console.log(args);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async registerCompany(_, { input }) {
    try {
      // loop thru all values of input and trim the white spaces
      for (const each in input) {
        if (each in input) {
          if (typeof input[each] === 'string') {
            input[each] = input[each].trim();
          }
        }
      }
      // validate the input that graphql will not validate
      const isEmail = validator.isEmail(input.organizationEmail);
      const isEmail2 = validator.isEmail(input.representativeEmail);

      if (!isEmail) {
        throw new Error('The email input is not a valid email');
      }
      if (!isEmail2) {
        throw new Error('The email input is not a valid email');
      }
      // check if user(company) exist on the platform before
      const userExists = await findOneByEmail(input.organizationEmail);

      if (userExists) {
        throw new Error('Email taken, Please try another email');
      }

      // create user
      const name = `${input.firstName} ${input.lastName}`;
      const password = await hash(input.password);

      // set activation token
      const randomBytesPromisified = promisify(randomBytes);
      const activationToken = (await randomBytesPromisified(20)).toString(
        'hex'
      );

      const user = await createUser({
        email: input.organizationEmail,
        representativeEmail: input.representativeEmail,
        companyName: input.organizationName,
        companyUrl: input.organizationUrl,
        address: input.organizationAddress,
        companySize: input.organizationSize,
        name,
        password,
        activationToken,
        type: 'COMPANY',
      });

      if (!user) {
        throw new Error('User creation was not successful');
      }

      // generate token
      const token = await sign(user._id);

      if (!token) {
        throw new Error('Token generation error');
      }

      // send email to the new company
      await send({
        filename: 'company_welcome',
        to: user.email,
        subject: 'Welcome to Choose Life',
        type: user.type,
        name: user.name,
        activationLink: `${
          process.env.FRONTEND_URL
        }/activate/${activationToken}`,
      });

      // send email to chooselife admin
      await send({
        filename: 'company_welcome_admin',
        to: process.env.CHOOSELIFE_ADMIN_EMAIL,
        subject: 'A new company just registered',
        name: user.name,
        loginLink: `${process.env.FRONTEND_URL}/login`,
      });

      // const result = { ...user._doc, password: null };
      const result = {
        message:
          'Company registered successfully? Check your email for further process',
        token,
      };

      // console.log(args);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async resendAdminActivationRequestMail(_, { email }) {
    try {
      const user = await findOneBasedOnQuery({
        email,
      });

      if (!user) {
        throw new Error(`No such user found for email ${email}`);
      }

      // resend email
      // send email to chooselife admin
      await send({
        filename: 'company_welcome_admin',
        to: process.env.CHOOSELIFE_ADMIN_EMAIL,
        subject: 'A new company just registered',
        name: user.name,
        loginLink: `${process.env.FRONTEND_URL}/login`,
      });

      return { message: 'Admin has been notified. Thanks' };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async activateCompany(_, { activationToken }, { req }) {
    // must be  done by an admin
    if (!req.userId) {
      throw new Error('You must be logged In');
    }

    if (req.user.type !== 'SUPERADMIN') {
      throw new Error('You do not have the permission to do this');
    }
    // confirm the validity of the activationToken
    const userExists = await findOneBasedOnQuery({ activationToken });
    if (!userExists) {
      throw new Error('Invalid activation');
    }
    // update the user
    userExists.activationToken = null;
    userExists.adminVerified = true;
    await userExists.save();
    // return a message
    return { message: 'User Activated' };
  },
  async suspendCompany(_, { id }, { req }) {
    // must be  done by an admin
    if (!req.userId) {
      throw new Error('You must be logged In');
    }

    if (req.user.type !== 'SUPERADMIN') {
      throw new Error('You do not have the permission to do this');
    }
    // confirm the validity of the activationToken
    const userExists = await findUserById(id);
    if (!userExists) {
      throw new Error('Invalid suspension process');
    }

    if (userExists.suspended === true) {
      throw new Error('user suspended already');
    }
    // update the user
    userExists.suspended = true;
    await userExists.save();
    // return a message
    return { message: 'User Suspended ' };
  },
  async unSuspendCompany(_, { id }, { req }) {
    // must be  done by an admin
    if (!req.userId) {
      throw new Error('You must be logged In');
    }

    if (req.user.type !== 'SUPERADMIN') {
      throw new Error('You do not have the permission to do this');
    }
    // confirm the validity of the activationToken
    const userExists = await findUserById(id);
    if (!userExists) {
      throw new Error('Invalid suspension process');
    }

    if (userExists.suspended === false) {
      throw new Error('user not suspended already');
    }
    // update the user
    userExists.suspended = false;
    await userExists.save();
    // return a message
    return { message: 'User is not suspended anymore' };
  },
  async suspendEmployee(_, { id }, { req }) {
    // must be  done by an admin
    if (!req.userId) {
      throw new Error('You must be logged In');
    }

    if (req.user.type !== 'COMPANY') {
      throw new Error('You do not have the permission to do this');
    }
    // confirm the validity of the activationToken
    const userExists = await findUserById(id);
    if (!userExists) {
      throw new Error('Invalid suspension process');
    }
    if (userExists.suspended === true) {
      throw new Error('user suspended already');
    }
    // update the user
    userExists.suspended = true;
    await userExists.save();
    // return a message
    return { message: 'User Suspended ' };
  },
  async unSuspendEmployee(_, { id }, { req }) {
    // must be  done by an admin
    if (!req.userId) {
      throw new Error('You must be logged In');
    }

    if (req.user.type !== 'COMPANY') {
      throw new Error('You do not have the permission to do this');
    }
    // confirm the validity of the activationToken
    const userExists = await findUserById(id);
    if (!userExists) {
      throw new Error('Invalid suspension process');
    }

    if (userExists.suspended === false) {
      throw new Error('user not suspended already');
    }

    // update the user
    userExists.suspended = false;
    await userExists.save();
    // return a message
    return { message: 'User not suspended ' };
  },
  async removeEmployee(_, { id }, { req }) {
    // must be  done by an admin
    if (!req.userId) {
      throw new Error('You must be logged In');
    }

    if (req.user.type !== 'COMPANY') {
      throw new Error('You do not have the permission to do this');
    }
    // confirm the validity of the activationToken
    const userExists = await removeUser(id);

    if (!userExists) {
      throw new Error('Invalid removal process');
    }
    // return a message
    return { message: 'User Removed ' };
  },
  async setEmployeeLimit(_, { amount, id }, { req }) {
    // must be done by an admin
    if (!req.userId) {
      throw new Error('You must be logged In');
    }

    if (req.user.type !== 'SUPERADMIN') {
      throw new Error('You do not have the permission to do this');
    }

    // confirm the id belongs to a valid company
    // update the company
    const updatedUser = await updateUser(
      { _id: id },
      { employeeLimit: amount }
    );
    // return a message
    return { message: `Limit set for Company ${updatedUser.companyName}` };
  },
  async adminOnBoardCompany(_, args, { req }) {
    try {
      // must be done by an admin
      if (!req.userId) {
        throw new Error('You must be logged In');
      }

      if (req.user.type !== 'SUPERADMIN') {
        throw new Error('You do not have the permission to do this');
      }
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
        type: 'COMPANY',
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
        resetLink: `${
          process.env.FRONTEND_URL
        }/reset?resetToken=${resetPasswordToken}`,
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

      await updateUser(
        { _id: userExist._id },
        { totalRewardPoints: userExist.totalRewardPoints + 5 }
      );

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
        type: args.accountType,
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
        resetLink: `${process.env.FRONTEND_URL}/reset/${resetPasswordToken}`,
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
        resetPasswordExpires: { $gt: Date.now() },
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
        resetLink: `${
          process.env.FRONTEND_URL
        }/reset_password/${resetPasswordToken}`,
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
        resetPasswordExpires: { $gt: Date.now() },
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
          password: hashedPassword,
          adminVerified: true,
        }
      );
      // 6. Generate JWT
      const token = await sign(user.id);

      // 7. send mail notification
      await send({
        filename: 'reset-successful',
        to: user.email,
        subject: 'Password Reset Successful',
        name: user.name,
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
      source: 'GOOGLE',
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

    gUser.adminVerified = true;
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
        Authorization: `Bearer ${access_token}`,
      },
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
      source: 'GOOGLE',
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

    gUser.adminVerified = true;
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

    if (req.user.type !== 'SUPERADMIN') {
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
      adminVerified: true,
      invitedBy: req.userId,
    };

    // create the new admin
    const user = await createUser(newAdminData);

    // send mail to the new admin to reset password
    await send({
      filename: 'add-new-admin',
      to: user.email,
      subject: 'Added to Choose Life as an Admin',
      name: user.name,
      resetLink: `${
        process.env.FRONTEND_URL
      }/reset?resetToken=${resetPasswordToken}`,
    });

    return {
      message:
        'You have added a new admin to the choose Life. Tell him/her to Check his/her mail',
    };
  },
  async removeNewAdmin(_, { email }, { req }) {
    // check whether the user is of type admin
    if (!req.userId) {
      throw new Error('You must be logged In');
    }

    if (req.user.type !== 'SUPERADMIN') {
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
      message: `You have removed <b>${email}</b> from the choose Life.`,
    };
  },
  async submitHRAResponse(_, { input }, { req, pubsub }) {
    try {
      // check whether the user is logged in
      if (!req.userId) {
        throw new Error('You must be logged In');
      }

      // check if the user is activated and not suspended
      if (req.user && req.user.adminVerified === false) {
        throw new Error('Account is not activated');
      }

      // check if the user is activated and not suspended
      if (req.user && req.user.suspended === true) {
        throw new Error('Account is suspend, contact your company');
      }

      // if the user does not have currentHra
      if (!req.user.currentHra) {
        // user are only allowed to do 3 hra within a year
        let userPopulatedData;
        if (req.user.hra.length > 3 && process.env.NODE_ENV === 'production') {
          // confirm whether the new one they are about to do now falls with a year(365 days) with the current 3 they have do before using the first and current one to check
          // fetch user data and populate the hra field
          userPopulatedData = await findUserByIdPopulated(req.userId).lean();

          // slice the last 3 out of the user"s hra;
          const recentThreeHra = userPopulatedData.hra.slice(-3);

          // compare the date of the first with the date.now();
          const timeOfTheFirstHra = recentThreeHra[0].createdAt;

          // calculate the difference in the timeOfTheFirstHra and new Date()
          const dateDifference = differenceInCalendarDays(
            new Date(),
            timeOfTheFirstHra
          );

          // if the dateDifference is less than 365 then the user cannot take another HRA till (365 - dateDifference) format
          // if otherwise they can continue the process of doing another HRA.
          const nextDate =
            Date.now() + (365 - dateDifference) * (1000 * 60 * 60 * 24);
          if (dateDifference < 365) {
            throw new Error(
              `You can only take 3 HRA within a year, contact ChooseLife Admin(${
                process.env.CHOOSELIFE_ADMIN_EMAIL
              }). Your next hra will only happen in ${365 -
                dateDifference} days on ${format(nextDate, 'PPP')}`
            );
          }
        }
        const responseToBeSubmitted = { ...input, stage: null };
        delete responseToBeSubmitted.stage;
        //   calc the % of the submitted response(total: 111)
        //   length of the responseToBeSubmitted object / total * 100
        const percentageProgress = Math.round(
          (Number(Object.keys(responseToBeSubmitted).length) / 111) * 100
        );

        const hraData = await hra.create({
          stage: input.stage,
          questionAndResponse: responseToBeSubmitted,
          ghmReference: req.userId,
          percentageProgress,
        });

        // update the user with his current hra
        await updateUser(
          { _id: req.userId },
          {
            $push: { hra: hraData._id },
            currentHra: hraData._id,
            totalRewardPoints: req.user.totalRewardPoints + 50,
          }
        );

        return {
          message: 'Response Saved Successfully',
          percentageProgress,
        };
      }

      if (req.user.currentHra && input.stage !== 'SUBMIT') {
        const hraData = await hra.findById(req.user.currentHra.toString());

        if (!hraData) {
          throw new Error('Error while updating');
        }
        const responseToBeSubmitted = {
          ...hraData.questionAndResponse,
          ...input,
          stage: null,
        };

        delete responseToBeSubmitted.stage;
        //   calc the % of the submitted response(total: 111)
        //   length of the responseToBeSubmitted object / total * 100
        const percentageProgress = Math.round(
          (Number(Object.keys(responseToBeSubmitted).length) / 111) * 100
        );

        hraData.questionAndResponse = responseToBeSubmitted;
        hraData.stage = input.stage;
        hraData.percentageProgress = percentageProgress;

        await hraData.save();

        await updateUser(
          { _id: req.userId },
          { totalRewardPoints: req.user.totalRewardPoints + 50 }
        );

        return {
          message: 'Response Updated Successfully',
          percentageProgress,
        };
      }

      if (input.stage === 'PREVIEW') {
        // find by ghmReference
        // loop thru the data
        // add the prefix "" and suffix "" to the `questionAndResponse`
        // update the data using `ghmReference`
        //   handled in the frontend
        return { message: 'All Response Reviewed', input };
      }

      if (input.stage === 'SUBMIT') {
        // fetch current response
        const hraData = await hra.findById(req.user.currentHra);

        if (!hraData) {
          throw new Error('You cannot submit without starting assessment');
        }

        const currentResponse = hraData.questionAndResponse;
        // confirm if the data is clean enough to be submitted
        const options = {
          method: 'POST',
          url: `${GHM_BASE_API}/appraise_risks`,
          headers: {},
          /* eslint-disable */
          formData: {
            json: `{"appraise_risks.client_id":"fitnessfair","appraise_risks.user_id":"${ req.userId }","appraise_risks.company":"${ req.user.company }","hra.app.units":"us_customary","hra.app.cholunits":"mg/dl","hra.app.hra_id":"midlife","save_key":"${req.userId || ""}","hra.q.age_in_years.a.years":"${currentResponse.age_in_years || "not answered"}","hra.q.arrested_dui.a.years":"${currentResponse.arrested_dui || "not answered"}","hra.q.bicycle_helmet_usage.a":"${currentResponse.bicycle_helmet_usage || "not answered"}","hra.q.binge_drinking.a.no":"${currentResponse.binge_drinking || "not answered"}","hra.q.binge_drinking.a":"${currentResponse.binge_drinking || "not answered"}","hra.q.blood_glucose.a":"${currentResponse.blood_glucose || "not answered"}","hra.q.blood_glucose_mml.a":"${currentResponse.blood_glucose_mml || "not answered"}","hra.q.blood_pressure_estimated.a":"${currentResponse.blood_pressure_estimated || "not answered"}","hra.q.blood_pressure_measured.a.high_number":"${currentResponse.blood_pressure_measured_high || "not answered"}","hra.q.blood_pressure_measured.a.low_number":"${currentResponse.blood_pressure_measured_low || "not answered"}","hra.q.blood_pressure_medication.a.0":"${currentResponse.blood_pressure_medication || "not answered"}","hra.q.blood_pressure_medication.a":"${currentResponse.blood_pressure_medication || "not answered"}","hra.q.body_frame_size.a":"${currentResponse.body_frame_size || "not answered"}","hra.q.butter.a":"${currentResponse.butter || "not answered"}","hra.q.caffeine.a":"${currentResponse.caffeine || "not answered"}","hra.q.charcoal_broiled.a":"${currentResponse.charcoal_broiled || "not answered"}","hra.q.chh_cough.a":"${currentResponse.chh_cough || "not answered"}","hra.q.chh_fever.a":"${currentResponse.chh_fever || "not answered"}","hra.q.chh_hands.a":"${currentResponse.chh_hands || "not answered"}","hra.q.chh_interact.a":"${currentResponse.chh_interact || "not answered"}","hra.q.chh_sbreath.a":"${currentResponse.chh_sbreath || "not answered"}","hra.q.cholesterol_check.a":"${currentResponse.cholesterol_check || "not answered"}","hra.q.cholesterol_level_mml.a":"${currentResponse.cholesterol_level_mml || "not answered"}","hra.q.cholesterol_level.a":"${currentResponse.cholesterol_level || "not answered"}","hra.q.cholesterol_level_estimated.a":"${currentResponse.cholesterol_level_estimated || "not answered"}","hra.q.colon_cancer_screening.a":"${currentResponse.colon_cancer_screening || "not answered"}","hra.q.commercial_driver.a":"${currentResponse.commercial_driver || "not answered"}","hra.q.cross_contamination.a":"${currentResponse.cross_contamination || "not answered"}","hra.q.cross_daily_cigars.a":"${currentResponse.cross_daily_cigars || "not answered"}","hra.q.cross_daily_marajuana.a":"${currentResponse.cross_daily_marajuana || "not answered"}","hra.q.cross_daily_pipes.a":"${currentResponse.cross_daily_pipes || "not answered"}","hra.q.cross_daily_shisha.a":"${currentResponse.cross_daily_shisha || "not answered"}","hra.q.desserts.a":"${currentResponse.desserts || "not answered"}","hra.q.diabetes_status.a.no":"${currentResponse.diabetes_status || "not answered"}","hra.q.diabetes_status.a":"${currentResponse.diabetes_status || "not answered"}","hra.q.difficulties_piling_up.a":"${currentResponse.difficulties_piling_up || "not answered"}","hra.q.distracted_driving.a.no":"${currentResponse.distracted_driving || "not answered"}","hra.q.distracted_driving.a":"${currentResponse.distracted_driving || "not answered"}","hra.q.drinking_and_driving.a.times_last month":"${currentResponse.drinking_and_driving || "not answered"}","hra.q.driving_speed.a":"${currentResponse.driving_speed || "not answered"}","hra.q.education.a":"${currentResponse.education || "not answered"}","hra.q.fast_food.a":"${currentResponse.fast_food || "not answered"}","hra.q.felt_confident.a":"${currentResponse.felt_confident || "not answered"}","hra.q.filling_forms.a":"${currentResponse.filling_forms || "not answered"}","hra.q.fish.a":"${currentResponse.fish || "not answered"}","hra.q.fruit.a":"${currentResponse.fruit || "not answered"}","hra.q.fruits_and_vegetables.a":"${currentResponse.fruits_and_vegetables || "not answered"}","hra.q.GADa.a":"${currentResponse.GADa || "not answered"}","hra.q.GADb.a":"${currentResponse.GADb || "not answered"}","hra.q.GADc.a":"${currentResponse.GADc || "not answered"}","hra.q.GADd.a":"${currentResponse.GADd || "not answered"}","hra.q.GADe.a":"${currentResponse.GADe || "not answered"}","hra.q.GADf.a":"${currentResponse.GADf || "not answered"}","hra.q.GADg.a":"${currentResponse.GADg || "not answered"}","hra.q.gainful_employment.a.no":"${currentResponse.gainful_employment || "not answered"}","hra.q.gainful_employment.a":"${currentResponse.gainful_employment || "not answered"}","hra.q.going_your_way.a":"${currentResponse.going_your_way || "not answered"}","hra.q.gross_weight.a":"${currentResponse.gross_weight || "not answered"}","hra.q.hb1ac_check.a":"${currentResponse.hb1ac_check || "not answered"}","hra.q.hdl_cholesterol_estimated.a":"${currentResponse.hdl_cholesterol_estimated || "not answered"}","hra.q.hdl_cholesterol_mml.a":"${currentResponse.hdl_cholesterol_mml || "not answered"}","hra.q.hdl_cholesterol.a":"${currentResponse.hdl_cholesterol || "not answered"}","hra.q.health_information_interest.a.yes":"${currentResponse.health_information_interest || "not answered"}","hra.q.health_information_interest.a":"${currentResponse.health_information_interest || "not answered"}","hra.q.heart_attack.a.no":"${currentResponse.heart_attack || "not answered"}","hra.q.heart_attack.a":"${currentResponse.heart_attack || "not answered"}","hra.q.heart_disease.a.no":"${currentResponse.heart_disease || "not answered"}","hra.q.heart_disease.a":"${currentResponse.heart_disease || "not answered"}","hra.q.height_cm.a.centemeters":"${currentResponse.height_cm || req.user.height || "not answered"}","hra.q.height.a.feet":"${currentResponse.height || "not answered"}","hra.q.height.a.inches":"${currentResponse.height || "not answered"}","hra.q.helmet_usage.a":"${currentResponse.helmet_usage || "not answered"}","hra.q.hispanic_origin.a":"${currentResponse.hispanic_origin || "not answered"}","hra.q.home_safety.a.yes":"${currentResponse.home_safety || "not answered"}","hra.q.home_safety.a":"${currentResponse.home_safety || "not answered"}","hra.q.household_income.a":"${currentResponse.household_income || "not answered"}","hra.q.hysterectomy.a":"${currentResponse.hysterectomy || "not answered"}","hra.q.insurance_coverage.a":"${currentResponse.insurance_coverage || "not answered"}","hra.q.junk_food.a":"${currentResponse.junk_food || "not answered"}","hra.q.last_mammogram.a":"${currentResponse.last_mammogram || "not answered"}","hra.q.marital_status.a":"${currentResponse.marital_status || "not answered"}","hra.q.misfortune.a":"${currentResponse.misfortune || "not answered"}","hra.q.overall_health.a":"${currentResponse.overall_health || "not answered"}","hra.q.pap_smear_test.a":"${currentResponse.pap_smear_test || "not answered"}","hra.q.PHQa.a":"${currentResponse.PHQa || "not answered"}","hra.q.PHQb.a":"${currentResponse.PHQb || "not answered"}","hra.q.PHQc.a":"${currentResponse.PHQc || "not answered"}","hra.q.PHQd.a":"${currentResponse.PHQd || "not answered"}","hra.q.PHQe.a":"${currentResponse.PHQe || "not answered"}","hra.q.PHQf.a":"${currentResponse.PHQf || "not answered"}","hra.q.PHQg.a":"${currentResponse.PHQg || "not answered"}","hra.q.PHQh.a":"${currentResponse.PHQh || "not answered"}","hra.q.PHQi.a":"${currentResponse.PHQi || "not answered"}","hra.q.protein.a":"${currentResponse.protein || "not answered"}","hra.q.race.a":"${currentResponse.race || "not answered"}","hra.q.readiness_to_eat_healthier.a":"${currentResponse.readiness_to_eat_healthier || "not answered"}","hra.q.readiness_to_exercise_more.a":"${currentResponse.readiness_to_exercise_more || "not answered"}","hra.q.readiness_to_quit_smoking.a":"${currentResponse.readiness_to_quit_smoking || "not answered"}","hra.q.readiness_to_reduce_alcohol_usage.a":"${currentResponse.readiness_to_reduce_alcohol_usage || "not answered"}","hra.q.resting_heart_rate.a.bpm":"${currentResponse.resting_heart_rate || "not answered"}","hra.q.safety_belt_usage.a.%":"${currentResponse.safety_belt_usage || "not answered"}","hra.q.sex.a":"${currentResponse.sex || req.user.gender.toLowerCase() || "not answered"}","hra.q.sleep1.a":"${currentResponse.sleep1 || "not answered"}","hra.q.sleep2.a":"${currentResponse.sleep2 || "not answered"}","hra.q.sleep3.a":"${currentResponse.sleep3 || "not answered"}","hra.q.sleep4.a":"${currentResponse.sleep4 || "not answered"}","hra.q.smokeless_tobacco.a.times_day":"${currentResponse.smokeless_tobacco || "not answered"}","hra.q.smoking.a.never_smoked":"${currentResponse.smoking || "not answered"}","hra.q.smoking.a":"${currentResponse.smoking || "not answered"}","hra.q.soft_drinks.a":"${currentResponse.soft_drinks || "not answered"}","hra.q.state_of_residence.a":"${currentResponse.state_of_residence || "not answered"}","hra.q.stroke.a.no":"${currentResponse.stroke || "not answered"}","hra.q.stroke.a":"${currentResponse.stroke || "not answered"}","hra.q.sugar_beverage.a":"${currentResponse.sugar_beverage || "not answered"}","hra.q.travel_by_automobile_km.a.,000 kilometers":"${currentResponse.travel_by_automobile_km || "not answered"}","hra.q.travel_by_automobile_km.a.,000_kilometers":"${currentResponse.travel_by_automobile_km || "not answered"}","hra.q.travel_by_automobile.a.,000_miles":"${currentResponse.travel_by_automobile || "not answered"}","hra.q.travel_by_motorcycle_km.a.,000 kilometers":"${currentResponse.travel_by_motorcycle_km || "not answered"}","hra.q.travel_by_motorcycle_km.a.,000_kilometers":"${currentResponse.travel_by_motorcycle_km || "not answered"}","hra.q.travel_by_motorcycle.a.,000_miles":"${currentResponse.travel_by_motorcycle || "not answered"}","hra.q.triglycerides.a":"${currentResponse.triglycerides || "not answered"}","hra.q.type_of_license.a":"${currentResponse.type_of_license || "not answered"}","hra.q.typical_travel_method.a":"${currentResponse.typical_travel_method || "not answered"}","hra.q.unable_to_control.a":"${currentResponse.unable_to_control || "not answered"}","hra.q.vaping.a.no":"${currentResponse.vaping || "not answered"}","hra.q.vaping.a":"${currentResponse.vaping || "not answered"}","hra.q.vegetables.a":"${currentResponse.vegetables || "not answered"}","hra.q.weekly_alcohol.a.beer":"${currentResponse.weekly_alcohol_beer || "not answered"}","hra.q.weekly_alcohol.a.mixed_drinks":"${currentResponse.weekly_alcohol_mixed_drinks || "not answered"}","hra.q.weekly_alcohol.a.wine_coolers":"${currentResponse.weekly_alcohol_wine_coolers || "not answered"}","hra.q.weekly_alcohol.a.wine":"${currentResponse.weekly_alcohol_wine || "not answered"}","hra.q.weekly_physical_activity.a":"${currentResponse.weekly_physical_activity || "not answered"}","hra.q.weight_kg.a.kilograms":"${currentResponse.weight_kg || req.user.weight || "not answered"}","hra.q.years_as_driver.a.kilograms":"${currentResponse.years_as_driver || "not answered"}","hra.q.years_since_quitting_months.a.kilograms":"${currentResponse.years_since_quitting_months || "not answered"}","hra.q.years_since_quitting_years.a.kilograms":"${currentResponse.years_since_quitting_years || "not answered"}","hra.q.weight.a.pounds":"${currentResponse.weight || "not answered"}", "hra.q.a.bathing": "${currentResponse.bathing || "not answered"}", "hra.q.a.dressing": "${currentResponse.dressing || "not answered"}", "hra.q.a.eating": "${currentResponse.eating || "not answered"}", "hra.q.a.out_of_bed": "${currentResponse.out_of_bed || "not answered"}", "hra.q.a.walking": "${currentResponse.walking || "not answered"}", "hra.q.a.getting_outside": "${currentResponse.getting_outside || "not answered"}", "hra.q.a.using_toilet": "${currentResponse.using_toilet || "not answered"}", "hra.q.a.meals": "${currentResponse.meals || "not answered"}", "hra.q.a.shopping": "${currentResponse.shopping || "not answered"}", "hra.q.a.managing_money": "${currentResponse.managing_money || "not answered"}", "hra.q.a.telephone": "${currentResponse.telephone || "not answered"}", "hra.q.weight.a.heavy_housework": "${currentResponse.heavy_housework || "not answered"}", "hra.q.weight.a.light_housework": "${currentResponse.light_housework || "not answered"}", "hra.q.weight.a.out_of_house": "${currentResponse.out_of_house || "not answered"}","hra.q.weight.a.limit_crime": "${currentResponse.limit_crime || "not answered"}", "hra.q.a.limit_crime": "${currentResponse.limit_crime || "not answered"}",
            "hra.q.a.age_at_menarche": "${currentResponse.age_at_menarche || "not answered"}", "hra.q.a.age_of_bearing_first_child": "${currentResponse.age_of_bearing_first_child || "not answered"}", "hra.q.a.family_breast_cancer_history": "${currentResponse.family_breast_cancer_history || "not answered"}", "hra.q.a.prostate_cancer_screening": "${currentResponse.prostate_cancer_screening || "not answered"}", "hra.q.a.relatives_cancer": "${currentResponse.relatives_cancer || "not answered"}", "hra.q.a.unprotected_sex": "${currentResponse.unprotected_sex || "not answered"}", "hra.q.a.street_drugs": "${currentResponse.street_drugs || "not answered"}"}`,
          },
          /* eslint-enable */
        };

        // save the response somewhere
        // post it to ghm appraise_risk endpoint
        // promisifying the request
        let result = await requestPromise(options);

        if (result.statusCode !== 200) {
          throw new Error('api request failed');
        }

        //   parse the response;
        result = JSON.parse(result.body);
        // const hraData = await hra.findOne({ ghmReference: req.userId });

        //   calc the % of the submitted response(total: 111)
        //   length of the responseToBeSubmitted object / total * 100
        const percentageProgress = 100;

        hraData.stage = 'SUBMITTED';
        hraData.reportId = result.meta && result.meta.report_id;
        hraData.percentageProgress = percentageProgress;

        await hraData.save();

        // update the current user:set the currentHra to null
        await updateUser(
          { _id: req.userId },
          {
            currentHra: null,
            totalRewardPoints: req.user.totalRewardPoints + 500,
          }
        );

        const notification = {
          message: 'hra submitted successfully',
        };
        // send notification with socket
        pubsub.publish('new-notification', {
          notification,
        });

        return {
          message: 'Response submitted',
          percentageProgress,
          reportId: hraData.reportId,
        };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async updateUserMutation(parent, { input }, { req }) {
    try {
      // check whether the user is logged in
      if (!req.userId) {
        throw new Error('You must be logged In');
      }

      // check if the user is activated and not suspended
      if (req.user && req.user.adminVerified === false) {
        throw new Error('Account is not activated');
      }

      // check if the user is activated and not suspended
      if (req.user && req.user.suspended === true) {
        throw new Error('Account is suspend, contact your company');
      }

      let name;
      let first;
      let last;
      // split former name
      if (req.user.name) {
        [first = '', last = ''] = req.user.name.split(' ');
      } else if (!req.user.name && input.firstName) {
        name = `${input.firstName} ${''}`;
      } else if (!req.user.name && input.lastName) {
        name = `${''} ${input.lastName}`;
      } else {
        throw new Error('update user name');
      }

      if (!input.firstName || !input.lastName) {
        /* eslint-disable */
        name = req.user.name;
        /* eslint-enable */
      }

      if (req.user.name && input.firstName) {
        name = `${input.firstName} ${last}`;
      }

      if (req.user.name && input.lastName) {
        name = `${first} ${input.lastName}`;
      }

      if (input.firstName && input.lastName) {
        name = `${input.firstName} ${input.lastName}`;
      }

      const updateData = { name, ...input };

      // remove null fields
      clean(updateData);

      // validate data
      const updatedUser = await updateUser({ _id: req.userId }, updateData);

      return updatedUser;
    } catch (error) {
      console.log(error.message);
      throw new Error('Server Error');
    }
  },
  async updateUserPassword(parent, { input }, { req }) {
    try {
      // check whether the user is logged in
      if (!req.userId) {
        throw new Error('You must be logged In');
      }

      // check if the user is activated and not suspended
      if (req.user && req.user.adminVerified === false) {
        throw new Error('Account is not activated');
      }

      // check if the user is activated and not suspended
      if (req.user && req.user.suspended === true) {
        throw new Error('Account is suspend, contact your company');
      }

      const { oldPassword, newPassword, confirmPassword } = input;
      // validate data
      // confirm  old_password match
      const matched = await match(oldPassword, req.user.password);

      if (!matched) {
        throw new Error('Incorrect password');
      }

      if (newPassword !== confirmPassword) {
        throw new Error('Password do not match');
      }
      // confirm the new_password and confirm_password
      if (matched && newPassword === confirmPassword) {
        // hash new password
        const newHashedPassword = await hash(newPassword);
        const updatedUser = await updateUser(
          { _id: req.userId },
          { password: newHashedPassword }
        );

        if (!updatedUser) {
          throw new Error('Error while updating');
        }

        return { message: 'Password update successful' };
      }
    } catch (error) {
      // console.log(error.message);
      throw new Error('Server Error');
    }
  },
  async addEmployeeToACompany(_, { input }, { req }) {
    try {
      // must be done by an admin
      if (!req.userId) {
        throw new Error('You must be logged In');
      }

      if (req.user.type !== 'COMPANY') {
        throw new Error('You do not have the permission to do this');
      }

      // check if the user is activated and not suspended
      if (req.user && req.user.adminVerified === false) {
        throw new Error('Account is not activated');
      }

      // check if the user is activated and not suspended
      if (req.user && req.user.suspended === true) {
        throw new Error('Account is suspend, contact your company');
      }

      // check the size limit
      if (req.user && req.user.companySize >= req.user.employeeLimit) {
        throw new Error(
          'You have exceeded your registered limit, contact Chooselife to add more'
        );
      }

      if (
        parseInt(req.user.companySize) + input.length >=
        req.user.employeeLimit
      ) {
        throw new Error(
          'You have exceeded your registered limit, contact Chooselife to add more'
        );
      }

      // create the user with their email and set their company details
      const newUsers = [];
      for (const each of input) {
        const password = await hash(casual.password);

        // request reset password
        const randomBytesPromisified = promisify(randomBytes);
        const resetPasswordToken = (await randomBytesPromisified(20)).toString(
          'hex'
        );
        const resetPasswordExpires = Date.now() + 3600000; // 1 hr from now

        const user = await createUser({
          name: `${each.firstName.trim()} ${each.lastName.trim()}`,
          email: each.email.trim(),
          company: req.userId,
          companyName: req.user.companyName,
          companyUrl: `${req.user.companyUrl || ''}`,
          branch: each.branch,
          department: each.department,
          type: 'EMPLOYEE',
          adminVerified: false,
          password,
          resetPasswordExpires,
          resetPasswordToken,
          invitedBy: req.userId,
        });

        // save the newly created user in an array
        newUsers.push(user);

        // send email to new user
        await send({
          filename: 'company_add_new',
          to: user.email,
          subject: 'Welcome to Choose Life',
          type: user.type,
          resetPasswordExpires,
          resetLink: `${
            process.env.FRONTEND_URL
          }/onboarding/employee/${resetPasswordToken}`,
        });
      }

      // update the company the size
      await updateUser(
        { _id: req.userId },
        { companySize: parseInt(req.user.companySize) + parseInt(input.length) }
      );

      // send email to add the newly added users
      return {
        message: `${input.length} employee has been added to your company`,
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new Error(
          `One of the email you're trying to add is an employee already `
        );
      }
      throw new Error(error.message);
    }
  },
  async resendCompanyAddEmployeeEmail(_, { id }, { req }) {
    try {
      // must be done by an admin
      if (!req.userId) {
        throw new Error('You must be logged In');
      }

      if (req.user.type !== 'EMPLOYEE') {
        throw new Error('You do not have the permission to do this');
      }

      const user = await findUserById(id);

      if (!user) {
        throw new Error('Invalid user💀');
      }

      if (user.resetPasswordExpires > Date.now()) {
        throw new Error(
          'Check your email and Your password reset link has not expired'
        );
      }
      user.resetPasswordExpires = Date.now() + 3600000 * 3; // 3 hr from now

      await user.save();

      // send email to new user
      await send({
        filename: 'company_add_new_resend',
        to: user.email,
        subject: 'Details to add you to company resent',
        type: user.type,
        resetPasswordExpires: user.resetPasswordExpires,
        resetLink: `${process.env.FRONTEND_URL}/onboarding/employee/${
          user.resetPasswordToken
        }`,
      });

      // send email to add the newly added users
      return {
        message: `Email resent to your email`,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async companyCreateReward(parent, { input }, { req }) {
    try {
      // must be done by an admin
      if (!req.userId) {
        throw new Error('You must be logged In');
      }

      if (req.user.type !== 'COMPANY') {
        throw new Error('You do not have the permission to do this');
      }

      // check if the user is activated and not suspended
      if (req.user && req.user.adminVerified === false) {
        throw new Error('Account is not activated');
      }

      // check if the user is activated and not suspended
      if (req.user && req.user.suspended === true) {
        throw new Error('Account is suspend, contact your company');
      }

      // check if any open reward still exist
      const openedRewards = await findAllRewards({
        createdBy: req.userId,
        isClosed: false,
      });

      if (openedRewards && openedRewards.length !== 0) {
        throw new Error(
          'You must closed the current reward before you are permitted to create another'
        );
      }
      const reward = await createReward({
        ...input,
        createdBy: req.userId,
      });

      if (!reward) {
        throw new Error('Problem creating reward');
      }

      // set the current reward by updating the company with her current reward
      await updateUser({ _id: req.userId }, { currentReward: reward._id });

      // update all the employees of the company with the current reward
      const employees = await findAllUsers({
        type: 'EMPLOYEE',
        company: req.userId,
      }).lean();

      for (const each of employees) {
        /* eslint-disable */
        await updateUser({ _id: each._id }, { currentReward: reward._id });
        /* eslint-enable */
      }

      return { message: 'Reward created successfully' };
    } catch (error) {
      // console.log(error);
      throw new Error(error.message);
    }
  },
  async companyUpdateReward(parent, { input }, { req }) {
    try {
      // must be done by an admin
      if (!req.userId) {
        throw new Error('You must be logged In');
      }

      if (req.user.type !== 'COMPANY') {
        throw new Error('You do not have the permission to do this');
      }

      // check if the user is activated and not suspended
      if (req.user && req.user.adminVerified === false) {
        throw new Error('Account is not activated');
      }

      // check if the user is activated and not suspended
      if (req.user && req.user.suspended === true) {
        throw new Error('Account is suspend, contact your company');
      }

      const dataToUpdate = Object.defineProperties(
        {},
        Object.getOwnPropertyDescriptors(input)
      );

      delete dataToUpdate.id;

      const reward = await updateReward({ _id: input.id }, { ...dataToUpdate });

      if (!reward) {
        throw new Error('Problem creating reward');
      }
      return reward;
    } catch (error) {
      // console.log(error);
      throw new Error(error.message);
    }
  },
  async closeOneReward(parent, { id }, { req }) {
    try {
      // must be done by an admin
      if (!req.userId) {
        throw new Error('You must be logged In');
      }

      if (req.user.type !== 'COMPANY') {
        throw new Error('You do not have the permission to do this');
      }

      // check if the user is activated and not suspended
      if (req.user && req.user.adminVerified === false) {
        throw new Error('Account is not activated');
      }

      // check if the user is activated and not suspended
      if (req.user && req.user.suspended === true) {
        throw new Error('Account is suspend, contact your company');
      }

      // check if its closed before
      const existingReward = await findRewardById(id);

      if (existingReward.isClosed) {
        throw new Error('Reward closed already');
      }
      const reward = await updateReward({ _id: id }, { isClosed: true });

      if (!reward) {
        throw new Error('Problem creating reward');
      }
      return { message: 'Reward closed successfully' };
    } catch (error) {
      // console.log(error);
      throw new Error(error.message);
    }
  },
  async createAppointmentMutation(parent, args, { req }) {
    try {
      // check whether the user is logged in
      if (!req.userId) {
        throw new Error('You must be logged In');
      }

      // check if the user is activated and not suspended
      if (req.user && req.user.adminVerified === false) {
        throw new Error('Account is not activated');
      }

      // check if the user is activated and not suspended
      if (req.user && req.user.suspended === true) {
        throw new Error('Account is suspend, contact your company');
      }
      const { date, time } = args.input;
      const [d, M, y] = date.split('/');
      const [h, m] = time.split(':');
      const dateObj = new Date(y, M - 1, d, h, m);
      // form the datetime object from the date and time separate variables
      // check if the date less than Date.now()
      const now = new Date();
      if (now > dateObj) {
        // throw Error;
        throw new Error('cannot set appointment in the past');
      }
      // delete time and date
      delete args.input.date;
      delete args.input.time;

      const appointmentData = { ...args.input, appointmentTime: dateObj };

      const appointment = await createAppointment(appointmentData);

      if (!appointment) {
        throw new Error('No Appointment ');
      }

      const datetime = format(appointmentData.appointmentTime, 'PPPPpppp');

      // update the user with his appointment
      await updateUser(
        { _id: req.userId },
        {
          $push: { appointments: appointment._id },
        }
      );

      // send email to chooselife admin
      await send({
        filename: 'appointment_mail',
        to: process.env.CHOOSELIFE_ADMIN_EMAIL,
        subject: 'Appointment Scheduled',
        name: req.user.name,
        title: appointmentData.title,
        description: appointmentData.description,
        datetime,
        type: appointmentData.type,
        professional: appointmentData.professional
          ? appointmentData.professional
          : '',
        purpose: appointmentData.purpose,
      });

      return {
        message:
          'Appointment Scheduled, ChooseLife Representative will contact immediately ',
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async subscribeToEmailList(parent, { input }, { req }) {
    try {
      // check whether the user is logged in
      if (!req.userId) {
        throw new Error('You must be logged In');
      }

      // check if the user is activated and not suspended
      if (req.user && req.user.adminVerified === false) {
        throw new Error('Account is not activated');
      }

      // check if the user is activated and not suspended
      if (req.user && req.user.suspended === true) {
        throw new Error('Account is suspend, contact your company');
      }

      // run a check to see if the email already exist in the list
      const emailExist = await findOneEmailSubscriberByEmail(input.email);

      if (emailExist) {
        throw new Error('Data already exist');
      }

      const newEmailListSubscriber = await createEmailSubscriber(input);

      if (!newEmailListSubscriber) {
        throw new Error('No Problem creating an Email Subscriber ');
      }

      // send email to the new email subscriber
      await send({
        filename: 'email_subscriber',
        to: newEmailListSubscriber.email,
        subject: 'You just joined ChooseLife Email Subscribers List',
        name: (req && req.user && req.user.name) || newEmailListSubscriber.name,
        activateLink: `${
          process.env.FRONTEND_URL
        }/activate-emaillistsubscriber/${newEmailListSubscriber._id}`,
      });

      return {
        message: 'Email Subscriber Added to List ',
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async unSubscribeFromEmailList(parent, { id, reason = '' }, { req }) {
    try {
      // check whether the user is logged in
      if (!req.userId) {
        throw new Error('You must be logged In');
      }

      // check if the user is activated and not suspended
      if (req.user && req.user.adminVerified === false) {
        throw new Error('Account is not activated');
      }

      // check if the user is activated and not suspended
      if (req.user && req.user.suspended === true) {
        throw new Error('Account is suspend, contact your company');
      }

      // run a check to see if the email already exist in the list
      const emailExist = await findEmailSubScriberById(id);

      if (emailExist.removed) {
        throw new Error('Already removed');
      }

      const removedEmailListSubscriber = await updateEmailSubScriber(
        { _id: id },
        { reason, removed: true }
      );

      if (!removedEmailListSubscriber) {
        throw new Error('No Problem creating an Email Subscriber ');
      }

      // send email to the new email subscriber
      await send({
        filename: 'removed_email_subscriber',
        to: removedEmailListSubscriber.email,
        subject: 'You have been removed from ChooseLife Email Subscribers List',
        name:
          (req && req.user && req.user.name) || removedEmailListSubscriber.name,
      });

      return {
        message: 'Email subscribers removed ',
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async activateSubscriber(parent, { id }, { req }) {
    try {
      // check whether the user is logged in
      if (!req.userId) {
        throw new Error('You must be logged In');
      }

      // check if the user is activated and not suspended
      if (req.user && req.user.adminVerified === false) {
        throw new Error('Account is not activated');
      }

      // check if the user is activated and not suspended
      if (req.user && req.user.suspended === true) {
        throw new Error('Account is suspend, contact your company');
      }

      // run a check to see if the email already exist in the list
      const emailExist = await findEmailSubScriberById(id);

      if (emailExist.confirmed) {
        throw new Error('Already confirmed');
      }

      const confirmedEmailListSubscriber = await updateEmailSubScriber(
        { _id: id },
        { confirmed: true }
      );

      if (!confirmedEmailListSubscriber) {
        throw new Error('problem occurred. Try again');
      }

      // send email to the new email subscriber
      await send({
        filename: 'confirmed_email_subscriber',
        to: confirmedEmailListSubscriber.email,
        subject: 'You confirmed your ChooseLife Email Subscribers Addition',
        name:
          (req && req.user && req.user.name) ||
          confirmedEmailListSubscriber.name,
      });

      return {
        message: 'Emaillist subscriber confirmed ',
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = mutation;
