const { gql } = require('apollo-server-express');

const app = require('../index');
const chooselife = require('./schema/chooselife');

// app;

beforeAll(() => app);
describe('Name of the group', () => {
  test('should ', async () => {
    const query = gql`
      mutation example_login {
        login(email: "kaeyzdevteam@mailinator.com", password: "*****") {
          _id
          name
          email
          representativeEmail
          mobile
          password
          type
          image
          gender
          nationality
          dob
          occupation
          address
          token
          resetPasswordExpires
          activationToken
          resetPasswordToken
          adminVerified
          source
          suspended
          totalRewardPoints
          weight
          height
          activity
          department
          branch
          companyName
          companyUrl
          companySize
          employeeLimit
          hra {
            _id
            questionAndResponse {
              age_at_menarche
            }
            ghmReference
            reportId
            stage
            percentageProgress
            createdAt
            updatedAt
          }
          currentHra {
            _id
            questionAndResponse {
              age_at_menarche
            }
            ghmReference
            reportId
            stage
            percentageProgress
            createdAt
            updatedAt
          }
          currentReward {
            _id
            title
            description
            startDate
            endDate
            isClosed
          }
          appointments {
            _id
            title
            purpose
            description
            appointmentTime
            type
            professional
            createdAt
            updatedAt
          }
          exercises {
            id
            image
            is_main
            license
            license_author
            status
            exercise {
              id
            }
          }
          mealPlan {
            _id
            title
            description
            mealPlanData {
              day1 {
                Breakfast
              }
            }
            advice
            createdAt
            updatedAt
          }
          inBody {
            _id
            inBodyData {
              value
            }
            inBodyReference
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }
    `;

    const res = await chooselife(query);
    console.log('res');
  });
});
