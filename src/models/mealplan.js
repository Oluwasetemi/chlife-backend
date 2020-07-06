const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const mealPlanSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    mealPlanStructure: {
      // the object of day timeOfTheDay food
      /*
      monday: {breakfast: '', lunch: '', dinner: '' }
      .
      .
      sunday: {breakfast: '', lunch: '', dinner: '' }
      */
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    type: {
      type: String,
      enum: ['INBODY', 'PROFESSIONAL'],
      required: true
    },
    category: {
      type: String,
      enum: ['INBODY', 'PROFESSIONAL'],
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Export the model
module.exports = mongoose.model('Appointment', mealPlanSchema);
