const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const hraSchema = new mongoose.Schema(
  {
    questionAndResponse: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    ghmReference: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// Export the model
module.exports = mongoose.model('Hra', hraSchema);
