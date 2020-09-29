# This is the changelog of the Backend

## v0.1.1

- Add support for email templates to show links in email to contain localhost
    (appropriate development environment)
- Re-structure the company register flow. CHeck the
    [Whimsical](https://whimsical.com/Vv6zHqCBLuYiME7UDYVEHk)
- Add activation support for when a company add a new employee. The admin get
    notified to activate the company account and set the limit based on the
    agreement with the client.
- Admin can set the limit of size of a company
- Add new fields to user model and update existing.fields added include
    (representativeEmail, activationToken, totalRewardPoints, department,
    branch, company, companyName, companyUrl, companySize, employeeLimit, hra,
    currentHra, currentReward).
- Add a new model for the reward created by a company(title, description,
    startDate, endDate, createdBy, isClosed)
- Update the seeding data for the admin and 20 users
- update mutation with new resolvers

1. `addEmployeeToACompany`
2. `companyCreateReward`
3. `companyUpdateReward`
4. `closeOneReward`

- update query with new resolvers

1. `fetchEmployeeOfACompany`
2. `searchEmployee`
3. `fetchCurrentReward`
4. `fetchAllClosedReward`
5. `fetchLeaderBoardCompany`

## v0.1.2

- Add a new mutation `suspendCompany` to the mutation list.
- update the email link inside the `addEmployeeToACompany` mutation
- Add delete other models in the `seed.js` - Reward and Hra.

## v0.1.3

- Remove the use of `mongoose-error-plugin` - It an internal change to change the duplicate error for emails.
- add `FetchEmployeesOfACompanyEnum` enum for the new `fetchEmployeesOfACompanyByCategory` query to fetch the employees working with a company various category like PENDING = adminVerified: false, ACTIVE = adminVerified: true & suspended: false, SUSPENDED = adminVerified: true & suspended: true
- Remove the `organizationSize: Int` from the graphQL schema.
- Deprecate the `adminOnBoardCompany` mutation.
- Add the following mutation to schema and resolver - `suspendCompany` && `unSuspendCompany` and `suspendEmployee` && `unSuspendEmployee`.
- Add `resendAdminActivationRequestMail` mutation to the schema to resendEmail to the admin if he delay activation of a company account and setting EmployeeLimit.
- Add support to be able to nest into `company` in the User schema since a company is also a user.
- Protect every endpoint(Query, Mutation) using the `adminVerified` field and `suspended` field.
- Add `removeUser` to the user services.

## v0.1.4

- fix the typo bug in the message string the 4 `suspend` mutation returns
- Add new query for `fetchPendingCompany` to fetch companies not yet activated.

## v0.1.5

- update all the registration mutation to send token to enable instant login
- Change the return type of the registerCompany from `Message` to `MessageWithToken`
- Clean up an error with `addEmployeeToACompany` (the condition to check the plan the user company paid chooselife for by checking employeeLimit against  companySize, if companySize is greater or equal to employeeLimit, contact the admin)
- Update the urlLink we are sending the new employee to from the `addEmployeeToACompany` mutation.

## v0.1.6

- update the `resetPassword` mutation to verify an employee when activating their account.
- Fix this bug [Invalid time](https://cdn.discordapp.com/attachments/727956924766748812/753380732956704799/unknown.png) - caused from not returning any data for `dob` of a user from attempting to format the date of birth of the user.

## v0.1.7

- create a new mutation to regenerate password reset token and resend the email to our employee during `addEmployeeToACompany`.

## v0.1.8

- create a new query `fetchAllRewards` and `fetchOneReward` to fetch all the reward on the platform.
- Implement the `totalRewardPoints` to work in the user schema, and after every submit of response 50 points is given to the user and for final Submission 500 points is given to the user.

## v0.1.9

- create a new mutation `createAppointmentMutation` to create appointment scheduled by employees. It sends an email to the chooselife admin.
- Add new fields to the `QuestionAndResponse` and `HRAResponseInput` and to the data sent over to GHM appraise risk endpoint when submitting a HRA.
  - bathing
  - dressing
  - eating
  - out_of_bed
  - walking
  - getting_outside
  - using_toilet
  - meals
  - shopping
  - managing_money
  - telephone
  - heavy_housework
  - light_housework
  - out_of_house
  - limit_crime
- Fix bug (Not working) for the `SearchEmployee` query and updated the `search` service from the User service.

## v0.2.0

- add new query to `userByIds` which accepts array of `ids` as input. Created `findUsersByIds` service as well.
- add query `searchCompany` to search through company at Admin level.
- add query `fetchAllEmailListSubscribers` to search through email subscribers list at Admin level.
- add query `fetchAdminReport` to hit the GHM api - `get_reports` to fetch all the list individual hra report and add name and email to the data returned from our database.
- add query `fetchCompanyReport` to hit the GHM api - `get_group_report_data` to fetch group of user_ids hra report and addd email and name to the data returned from our database.
- create `subscribeToEmailList` , `activateSubscriber` and `unSubscribeFromEmailList` mutation for manipulating EmailSubscriber's List.

## v0.2.1

- Improved the `me` query to return `appointments` and `currentReward`
