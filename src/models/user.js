const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    mobile: {
      type: String
      // required: true,
      // unique: true
    },
    // A secure password should possess characters (0-9, A-Z alphanumeric symbols
    password: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['INDIVIDUAL', 'EMPLOYEE', 'COMPANY', 'SUPERADMIN', 'ADMIN'],
      required:
        'Specify the type of the user - either : individual, employee, company, super-admin, admin'
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/350'
    },
    gender: {
      type: String,
      enum: ['MALE', 'FEMALE']
      // required: true
    },
    nationality: { type: String, default: 'nigerian' },
    dob: { type: Date },
    occupation: { type: String },
    address: { type: String },
    // reset password details
    resetPasswordExpires: { type: Number },
    resetPasswordToken: { type: String },
    /**
     * Store the objectId of the company or choose_life_admin that invited the user
     */
    invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    /**
     * For agent to initial wallet payout, he must be verified by the admin
     */
    adminVerified: { type: Boolean, default: false },
    /**
     * source of the auth default to email with possible option to gmail and twitter
     */
    source: {
      type: String,
      default: 'EMAIL',
      enum: ['EMAIL', 'GOOGLE']
    },
    suspended: {
      type: Boolean,
      default: false
    },
    totalRewardPoints: {
      type: Number,
      default: 0
    },
    weight: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    activity: {
      type: String,
      enum: [
        'HIGH',
        'MEDIUM',
        'LOW',
        'VERYACTIVE',
        'SOMEWHATACTIVE',
        'LOWACTIVITY'
      ]
    },
    /**
     * The company of the employee if any
     */
    company: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: 'User'
      type: String
    },
    /**
     * The array of the id of the HRA taken
     */
    hra: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hra'
      }
    ],
    /**
     * The array of the appointment with a medical professional
     */
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
      }
    ],
    /**
     * The array of the exercises recommended to a user
     */
    exercises: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise'
      }
    ],
    /**
     * The meal plan recommended to a user
     */
    mealPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MealPlan'
    },
    /**
     * The array of the id of the inBody data fetch via thr cloud api
     */
    inBody: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InBody'
      }
    ]
  },
  {
    timestamps: true
  }
);

// Export the model
module.exports = mongoose.model('User', userSchema);
