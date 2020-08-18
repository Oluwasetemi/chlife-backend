const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    representativeEmail: {
      type: String,
      trim: true,
    },
    mobile: {
      type: String,
      // required: true,
      trim: true,
    },
    // A secure password should possess characters (0-9, A-Z alphanumeric symbols
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['INDIVIDUAL', 'EMPLOYEE', 'COMPANY', 'SUPERADMIN', 'ADMIN'],
      required:
        'Specify the type of the user - either : INDIVIDUAL, EMPLOYEE, COMPANY, SUPER-ADMIN, ADMIN',
      default: 'INDIVIDUAL',
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/350.png',
    },
    gender: {
      type: String,
      enum: ['MALE', 'FEMALE'],
      // required: true
    },
    nationality: { type: String, default: 'nigeria' },
    dob: { type: Date },
    occupation: { type: String },
    address: { type: String },
    // reset password details
    resetPasswordExpires: { type: Number },
    activationToken: { type: String },
    resetPasswordToken: { type: String },
    /**
     * verify a company by an admin
     */
    adminVerified: { type: Boolean, default: false },
    /**
     * source of the auth default to email with possible option to gmail and twitter
     */
    source: {
      type: String,
      default: 'EMAIL',
      enum: ['EMAIL', 'GOOGLE'],
    },
    suspended: {
      type: Boolean,
      default: false,
    },
    totalRewardPoints: {
      type: Number,
      default: 0,
    },
    weight: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
    activity: {
      type: String,
      enum: [
        'HIGH',
        'MEDIUM',
        'LOW',
        'VERYACTIVE',
        'SOMEWHATACTIVE',
        'LOWACTIVITY',
      ],
    },
    department: {
      type: String,
    },
    branch: {
      type: String,
    },
    /**
     * The company ref of the employee if any
     */
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // type: String,
    },
    /**
     * The company name of the employee if any
     */
    companyName: {
      type: String,
      trim: true,
    },
    /**
     * The company url of the employee if any
     */
    companyUrl: {
      type: String,
      trim: true,
    },
    /**
     * The company size of the employee if any
     */
    companySize: {
      type: Number,
      default: 0,
    },
    /**
     * The company size limit of the employee set by the chooselife plan you subscribed for
     * Only an admin can alter field
     */
    employeeLimit: {
      type: Number,
      default: 0,
    },
    /**
     * The array of the id of the HRA taken
     */
    hra: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hra',
      },
    ],
    /**
     * if currentHra?the id of the HRA currently
     */
    currentHra: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hra',
    },
    /**
     * if currentReward?the id of the HRA currently
     */
    currentReward: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reward',
    },
    /**
     * The array of the appointment with a medical professional
     */
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
      },
    ],
    /**
     * The array of the exercises recommended to a user
     */
    exercises: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise',
      },
    ],
    /**
     * The meal plan recommended to a user
     */
    mealPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MealPlan',
    },
    /**
     * The array of the id of the inBody data fetch via thr cloud api
     */
    inBody: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InBody',
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.index({ name: 'text', email: 'text' });

// Export the model
module.exports = mongoose.model('User', userSchema);
