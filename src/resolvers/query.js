/* eslint-disable no-inner-declarations */
const { readFileSync } = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { promisify } = require('util');
const dateFns = require('date-fns');
const request = require('request');

const { cmToMeters, calculateBMI } = require('../utils/helpers');

const { verify } = require('../utils/auth');
const {
  findUserById,
  findAllUsers,
  findBasedOnQuery,
  search,
  findUsersByIds,
} = require('../services/user');
const {
  findAllRewards,
  findOneRewardBasedOnQuery,
} = require('../services/reward');
const { findAllEmailSubscribers } = require('../services/emailSubscriber');
const hra = require('../models/hra');

const requestPromise = promisify(request);

const GHM_BASE_API =
  process.env.NODE_ENV === 'production'
    ? process.env.GHM_PRODUCTION
    : process.env.GHM_TEST;

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
  async userByIds(_, { ids }, { req }) {
    try {
      // must be done by an admin
      if (!req.userId) {
        throw new Error('You must be logged In');
      }

      if (req.user.type !== 'SUPERADMIN') {
        throw new Error('You do not have the permission to do this');
      }

      if (Array.isArray(ids)) {
        const users = await findUsersByIds(ids);

        if (!users) {
          throw new Error('No user found');
        }

        return users;
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

    if (req.user.type !== 'SUPERADMIN' && req.user.type !== 'COMPANY') {
      throw new Error('You do not have the permission to do this');
    }

    // eslint-disable-next-line
    let query = { type };
    if (req.user.type === 'COMPANY' && type === 'EMPLOYEE') {
      query = { type, company: req.userId };
    }

    // this should be protected for only admin
    const users = await findAllUsers(query);

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
        'utf8'
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
        url: `${GHM_BASE_API}/get_questionnaire`,
        headers: {},
        /* eslint-disable */
        formData: {
          json: `{"get_questionnaire.client_id": "fitnessfair", "get_questionnaire.user_id": "${ req.userId }",    "get_questionnaire.hra_id": "default", "get_questionnaire.org_id": "","get_questionnaire.name": "${ req.user.name }","get_questionnaire.sex": "${ req.user.gender }",\n    "get_questionnaire.dob": "${formatDate(req.user.dob) || ''}","get_questionnaire.race_ethinicity": "choose an answer","get_questionnaire.hispanic_origin": "choose an answer","get_questionnaire.home_address": "${req .user.address || ''}","get_questionnaire.work_address": "","get_questionnaire.organization_name": "${req.user.company || ''}"}`,
        },
        /* eslint-enable */
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
  async searchCompany(_, { searchInput }, { req }) {
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

      const searchedCompany = await search({
        searchInput,
        type: 'COMPANY',
      });

      if (!searchedCompany) {
        throw new Error('No data found');
      }

      return searchedCompany;
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

      if (req.user.type !== 'COMPANY' && req.user.type !== 'EMPLOYEE') {
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
  async fetchAllEmailListSubscribers(_, args, { req }) {
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

      const allEmailList = await findAllEmailSubscribers({});

      if (!allEmailList) {
        throw new Error('No data found');
      }

      return allEmailList;
    } catch (error) {
      // console.log(error);
      throw new Error(error.message);
    }
  },
  async fetchAdminReport(_, args, { req }) {
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

      const startTime = '2020-07-01';
      const endTimeObject = new Date();
      const endTimeStr = endTimeObject.toLocaleDateString();
      const [m, d, y] = endTimeStr.split('/');

      // use restructuring to arrange properly
      // [y, m, d] = [m, d, y];

      const endTimeReversed = [y, m, d].join('/');

      const endTime = endTimeReversed.replace(/\//g, '-');

      const options = {
        method: 'POST',
        url: `${GHM_BASE_API}/get_reports`,
        headers: {},
        formData: {
          json: `{"get_reports.client_id":"fitnessfair","get_reports.start_time": "${startTime}","get_reports.end_time":"${endTime}"}`,
        },
      };
      const res = await requestPromise(options);

      if (res.statusCode !== 200) {
        throw new Error('api request failed');
      }

      const { data } = JSON.parse(res.body);

      // loop thru the api result to add the name, email to each object
      const adminReportData = [];

      for (const each of data) {
        const isValid = mongoose.Types.ObjectId.isValid(each.user_id);
        let user;
        if (isValid) {
          user = await findUserById(each.user_id);
        }
        each.name = (user && user.name) || 'no name';
        each.email = (user && user.email) || 'no email';
        adminReportData.push(each);
      }

      return { adminReportData, length: adminReportData.length };
    } catch (error) {
      // console.log(error);
      throw new Error(error.message);
    }
  },
  async fetchCompanyReport(_, args, { req }) {
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

      const employees = await findAllUsers({
        type: 'EMPLOYEE',
        company: req.userId,
      }).lean();

      const employeesArr = [];
      for (const each of employees) {
        /* eslint-disable */
        let str =  JSON.stringify(each._id);
        employeesArr.push(str)
        /* eslint-enable */
      }

      const startTime = '2020-07-01';
      const endTimeObject = new Date();
      const endTimeStr = endTimeObject.toLocaleDateString();
      const [m, d, y] = endTimeStr.split('/');

      // use restructuring to arrange properly
      // [y, m, d] = [m, d, y];

      const endTimeReversed = [y, m, d].join('/');

      const endTime = endTimeReversed.replace(/\//g, '-');

      const options = {
        method: 'POST',
        url: `${GHM_BASE_API}/get_group_report_data`,
        headers: {},
        /* eslint-disable */
        formData: {
          json: `{"get_group_report_data.client_id":"fitnessfair","get_group_report_data.user_ids":[${employeesArr}],"get_group_report_data.fields":["engine_input.sex","engine_input.age", "user_id", "report_id", "engine_timestamp"], "get_reports.start_time": "${startTime}","get_reports.end_time":"${endTime}"}`,
        },
        /* eslint-enable */
      };
      const res = await requestPromise(options);

      if (res.statusCode !== 200) {
        throw new Error('api request failed');
      }

      const { data } = JSON.parse(res.body);

      // loop thru the api result to add the name, email to each object
      const adminReportData = [];

      for (const each of data) {
        const isValid = mongoose.Types.ObjectId.isValid(each.user_id);
        let user;
        if (isValid) {
          user = await findUserById(each.user_id);
        }
        each.name = (user && user.name) || 'no name';
        each.email = (user && user.email) || 'no email';
        adminReportData.push(each);
        each.report_ts = each.engine_timestamp;
      }

      return { adminReportData, length: adminReportData.length };
    } catch (error) {
      // console.log(error);
      throw new Error(error.message);
    }
  },
  async BMI(_, args, { req }) {
    try {
      // must be done by an admin
      if (!req.userId) {
        throw new Error('You must be logged In');
      }

      if (req.user.type !== 'EMPLOYEE') {
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

      // check if the user is activated and not suspended
      if (req.user.weight === 0 || req.user.height === 0) {
        throw new Error('Please update you weight and height');
      }

      const bmi = calculateBMI(req.user.weight, cmToMeters(req.user.height));

      return { ...bmi };
    } catch (error) {
      // console.log(error);
      throw new Error(error.message);
    }
  },
};

module.exports = query;
