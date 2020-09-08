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
