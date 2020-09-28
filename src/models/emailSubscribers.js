const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const emailSubscriberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    removed: {
      type: Boolean,
      required: true,
      default: false,
    },
    confirmed: {
      type: Boolean,
      required: true,
      default: false,
    },
    removedReason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
module.exports = mongoose.model('EmailSubscriber', emailSubscriberSchema);
