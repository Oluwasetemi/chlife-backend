const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const exerciseSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    image: {
      type: String,
    },
    is_main: {
      // the object of name, videolink, imagelink
      type: mongoose.Schema.Types.Mixed,
    },
    license: {
      type: String,
    },
    license_author: {
      type: String,
    },
    status: {
      type: String,
      trim: true,
    },
    exercise: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
module.exports = mongoose.model('Exercise', exerciseSchema);
