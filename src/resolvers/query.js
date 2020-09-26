/* eslint-disable no-inner-declarations */
const { readFileSync } = require('fs');
const path = require('path');
const { promisify } = require('util');
const dateFns = require('date-fns');
const request = require('request');
const { verify } = require('../utils/auth');
const {
  findUserById,
  findAllUsers,
  findBasedOnQuery,
  search,
} = require('../services/user');
const {
  findAllRewards,
  findOneRewardBasedOnQuery,
} = require('../services/reward');
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
      // must be done by an admin
      if (!req.userId) {
        throw new Error('You must be logged In');
      }

      if (req.user.type !== 'SUPERADMIN') {
        throw new Error('You do not have the permission to do this');
      }

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
  async users(parent, args, { req }) {
    // must be done by an admin
    if (!req.userId) {
      throw new Error('You must be logged In');
    }

    if (req.user.type !== 'SUPERADMIN') {
      throw new Error('You do not have the permission to do this');
    }

    // this should be protected for only admin
    const users = await findAllUsers({});

    if (!users) {
      throw new Error('Users not found');
    }

    return users;
  },
  async usersByType(_, { type }, { req }) {
    // must be done by an admin
    if (!req.userId) {
      throw new Error('You must be logged In');
    }

    if (req.user.type !== 'SUPERADMIN') {
      throw new Error('You do not have the permission to do this');
    }

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
      if (!req.user || !req.userId) {
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

      let questions = await readFileSync(
        path.join(__dirname, '../../ghm-hra-questions.json'),
        'utf8',
      );

      function formatDate(str) {
        try {
          const res = dateFns.formatISO(new Date(str), {
            representation: 'date',
          });

          if (!res) {
            return false;
          }
          return res;
        } catch (error) {
          return false;
        }
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
          }",\n    "get_questionnaire.dob": "${formatDate(req.user.dob) ||
            ''}",\n    "get_questionnaire.race_ethinicity": "choose an answer",\n    "get_questionnaire.hispanic_origin": "choose an answer",\n    "get_questionnaire.home_address": "${req
            .user.address ||
            ''}",\n    "get_questionnaire.work_address": "",\n    "get_questionnaire.organization_name": "${req
            .user.company || ''}"\n}`,
          signer: 'e650303e-e1e1-11e6-b68a-42010af00005@api.ghmcorp.com',
          signature:
            '9f1c026cb6795e7a0a53ab33c7304053cae51eea5653d6faed59e9a5c0547aa8',
        },
      };

      // promisifying the request

      const result = await requestPromise(options);

      if (result.statusCode !== 200) {
        throw new Error('api request failed');
      }

      questions = JSON.parse(questions);
      const inputLowerCase = input.toLowerCase();

      const resultData = questions.find((each) => {
        if (inputLowerCase === 'nutritionii') {
          return each.id === '65nutrition';
        }
        return each.id === inputLowerCase || each.id === `65${inputLowerCase}`;
      });

      return {
        ...resultData,
        qCount: (resultData.q && resultData.q.length) || null,
      };
    } catch (error) {
      // console.log(error);
      throw new Error(error.message);
    }
  },
  async currentUserResponse(_, args, { req }) {
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

      const userHraId = req.user.currentHra;

      return hra.findById(userHraId);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async fetchEmployeesOfACompany(_, args, { req }) {
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

      const companyEmployees = await findBasedOnQuery({
        company: req.userId,
      });

      if (!companyEmployees) {
        throw new Error('No data found');
      }

      return companyEmployees;
    } catch (error) {
      // console.log(error);
      throw new Error(error.message);
    }
  },
  async fetchEmployeesOfACompanyByCategory(_, { by }, { req }) {
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

      let companyEmployees;
      if (by === 'PENDING') {
        companyEmployees = await findBasedOnQuery({
          company: req.userId,
          adminVerified: false,
        });
      }

      if (by === 'ACTIVE') {
        companyEmployees = await findBasedOnQuery({
          company: req.userId,
          adminVerified: true,
          suspended: false,
        });
      }

      if (by === 'SUSPENDED') {
        companyEmployees = await findBasedOnQuery({
          company: req.userId,
          adminVerified: true,
          suspended: true,
        });
      }

      if (!companyEmployees) {
        throw new Error('No data found');
      }

      return companyEmployees;
    } catch (error) {
      // console.log(error);
      throw new Error(error.message);
    }
  },
  async fetchPendingCompany(_, args, { req }) {
    try {
      // must be done by an admin
      if (!req.userId) {
        throw new Error('You must be logged In');
      }

      if (req.user.type !== 'SUPERADMIN') {
        throw new Error('You do not have the permission to do this');
      }

      const companyEmployees = await findBasedOnQuery({
        type: 'COMPANY',
        adminVerified: false,
      });

      if (!companyEmployees) {
        throw new Error('No data found');
      }

      return companyEmployees;
    } catch (error) {
      // console.log(error);
      throw new Error(error.message);
    }
  },
  async fetchEmployeesOfACompanyByCategory(_, { by }, { req }) {
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

      let companyEmployees;
      if (by === 'PENDING') {
        companyEmployees = await findBasedOnQuery({
          company: req.userId,
          adminVerified: false,
        });
      }

      if (by === 'ACTIVE') {
        companyEmployees = await findBasedOnQuery({
          company: req.userId,
          adminVerified: true,
          suspended: false,
        });
      }

      if (by === 'SUSPENDED') {
        companyEmployees = await findBasedOnQuery({
          company: req.userId,
          adminVerified: true,
          suspended: true,
        });
      }

      if (!companyEmployees) {
        throw new Error('No data found');
      }

      return companyEmployees;
    } catch (error) {
      // console.log(error);
      throw new Error(error.message);
    }
  },
  async searchEmployee(_, { searchInput }, { req }) {
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

      const searchedCompanyEmployees = await search({
        searchInput,
        id: req.userId,
      });

      if (!searchedCompanyEmployees) {
        throw new Error('No data found');
      }

      return searchedCompanyEmployees;
    } catch (error) {
      // console.log(error);
      throw new Error(error.message);
    }
  },
  async fetchCurrentReward(_, args, { req }) {
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

      const currentReward = await findOneRewardBasedOnQuery({
        _id: req.user.currentReward,
      });

      if (!currentReward) {
        throw new Error('No current reward');
      }

      return currentReward;
    } catch (error) {
      // console.log(error);
      throw new Error(error.message);
    }
  },
  async fetchOneReward(_, { id }, { req }) {
    try {
      // must be done by an admin
      if (!req.userId) {
        throw new Error('You must be logged In');
      }

      // if (req.user.type !== 'COMPANY') {
      //   throw new Error('You do not have the permission to do this');
      // }

      // check if the user is activated and not suspended
      if (req.user && req.user.adminVerified === false) {
        throw new Error('Account is not activated');
      }

      // check if the user is activated and not suspended
      if (req.user && req.user.suspended === true) {
        throw new Error('Account is suspend, contact your company');
      }

      const currentReward = await findOneRewardBasedOnQuery({
        _id: id,
      });

      if (!currentReward) {
        throw new Error('No reward with that ID found');
      }

      return currentReward;
    } catch (error) {
      // console.log(error);
      throw new Error(error.message);
    }
  },
  async fetchAllClosedReward(_, args, { req }) {
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

      const closedRewards = await findAllRewards({
        createdBy: req.userId,
        isClosed: true,
      });

      if (!closedRewards) {
        throw new Error('No closed reward found');
      }

      return closedRewards;
    } catch (error) {
      // console.log(error);
      throw new Error(error.message);
    }
  },
  async fetchAllRewards(_, args, { req }) {
    try {
      // must be done by an admin
      if (!req.userId) {
        throw new Error('You must be logged In');
      }

      if (req.user.type !== 'SUPERADMIN') {
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

      const rewards = await findAllRewards({});

      if (!rewards) {
        throw new Error('No reward found');
      }

      return rewards;
    } catch (error) {
      // console.log(error);
      throw new Error(error.message);
    }
  },
  async fetchLeaderBoardCompany(_, args, { req }) {
    try {
      // must be done by an admin
      if (!req.userId) {
        throw new Error('You must be logged In');
      }

      // if (req.user.type !== 'COMPANY') {
      //   throw new Error('You do not have the permission to do this');
      // }

      // check if the user is activated and not suspended
      if (req.user && req.user.adminVerified === false) {
        throw new Error('Account is not activated');
      }

      // check if the user is activated and not suspended
      if (req.user && req.user.suspended === true) {
        throw new Error('Account is suspend, contact your company');
      }

      let value;
      if (req.user.type === 'EMPLOYEE') {
        value = req.user.company;
      } else {
        value = req.userId;
      }

      const allEmployee = await findAllUsers({
        company: value,
      });

      if (!allEmployee) {
        throw new Error('No data returned');
      }

      const cleanAllEmployee = JSON.parse(JSON.stringify(allEmployee));

      const leaderBoard = [];
      for (const each of cleanAllEmployee) {
        const copy = {};
        copy.id = each._id;
        copy.name = each.name;
        copy.department = each.department;
        copy.branch = each.branch;
        copy.points = each.totalRewardPoints;

        leaderBoard.push(copy);
      }

      // sort leaderBoard
      leaderBoard.sort((value1, value2) => value2.points - value1.points);

      return leaderBoard;
    } catch (error) {
      // console.log(error);
      throw new Error(error.message);
    }
  },
};

module.exports = query;
