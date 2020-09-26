const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const exerciseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    body: {
      // the object of name, videolink, imagelink
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    type: {
      type: String,
      enum: ['INBODY', 'PROFESSIONAL'],
      required: true,
    },
    category: {
      type: String,
      enum: ['INBODY', 'PROFESSIONAL'],
      required: true,
    },
    advice: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Export the model
module.exports = mongoose.model('Exercise', exerciseSchema);
