const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const rewardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    /**
     * a company will only have one current reward and the rest will be closed
     */
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      refs: 'User',
    },
    isClosed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Export the model
module.exports = mongoose.model('Reward', rewardSchema);
