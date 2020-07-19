/* eslint-disable no-inner-declarations */
const { readFileSync } = require('fs');
const path = require('path');
const { promisify } = require('util');
const dateFns = require('date-fns');
const request = require('request');
const { verify } = require('../utils/auth');
const { findUserById, findAllUsers } = require('../services/user');
const hra = require('../models/hra');

const requestPromise = promisify(request);

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
  async userById(_, { id }, { req }) {
    try {
      // console.log(req);
      // console.log(req.headers.authorization);
      // const token = req.headers.authorization;

      // if (!id) {
      //   throw new Error("You're not logged in");
      // }

      // const { id } = await verify(token);

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
  },
  async fetchHraQuestion(_, { input }, { req }) {
    try {
      // check whether the user is logged in
      if (!req.userId) {
        throw new Error('You must be logged In');
      }

      let questions = await readFileSync(
        path.join(__dirname, '../../ghm-hra-questions.json'),
        'utf8'
      );

      function formatDate(str) {
        return dateFns.formatISO(new Date(str), { representation: 'date' });
      }

      const options = {
        method: 'POST',
        url: 'https://hra-api.ghmcorp.com/api/v2/get_questionnaire',
        headers: {},
        formData: {
          json: `{\n    "get_questionnaire.client_id": "fitnessfair",\n    "get_questionnaire.user_id": "${
            req.userId
          }",\n    "get_questionnaire.hra_id": "default",\n    "get_questionnaire.org_id": "",\n    "get_questionnaire.name": "${
            req.user.name
          }",\n    "get_questionnaire.sex": "${
            req.user.gender
          }",\n    "get_questionnaire.dob": "${formatDate(
            req.user.dob
          )}",\n    "get_questionnaire.race_ethinicity": "choose an answer",\n    "get_questionnaire.hispanic_origin": "choose an answer",\n    "get_questionnaire.home_address": "${
            req.user.address
          }",\n    "get_questionnaire.work_address": "",\n    "get_questionnaire.organization_name": "${
            req.user.company
          }"\n}`,
          signer: 'e650303e-e1e1-11e6-b68a-42010af00005@api.ghmcorp.com',
          signature:
            '9f1c026cb6795e7a0a53ab33c7304053cae51eea5653d6faed59e9a5c0547aa8'
        }
      };

      // promisifying the request

      const result = await requestPromise(options);

      if (result.statusCode !== 200) {
        throw new Error('api request failed');
      }

      questions = JSON.parse(questions);
      const inputLowerCase = input.toLowerCase();

      const resultData = questions.find(each => {
        if (inputLowerCase === 'nutritionii') {
          return each.id === '65nutrition';
        }
        return each.id === inputLowerCase || each.id === `65${inputLowerCase}`;
      });

      return {
        ...resultData,
        qCount: (resultData.q && resultData.q.length) || null
      };
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  },
  async currentUserResponse(_, args, { req }) {
    // check whether the user is logged in
    if (!req.userId) {
      throw new Error('You must be logged In');
    }

    const userHraId = req.user.hra[0]._id.toString();

    return hra.findById(userHraId);
  }
};

module.exports = query;
