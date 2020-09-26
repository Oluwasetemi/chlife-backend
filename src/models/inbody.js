const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const inBodySchema = new mongoose.Schema(
  {
    inBodyData: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    inBodyReference: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Export the model
module.exports = mongoose.model('InBody', inBodySchema);
