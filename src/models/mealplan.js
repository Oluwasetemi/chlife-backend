const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const mealPlanSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    mealPlanData: {
      // the object of day timeOfTheDay food
      /*
      monday: {breakfast: '', lunch: '', dinner: '' }
      .
      .
      sunday: {breakfast: '', lunch: '', dinner: '' }
      */
      type: mongoose.Schema.Types.Mixed,
    },
    advice: String,
  },
  {
    timestamps: true,
  }
);

// Export the model
module.exports = mongoose.model('Mealplan', mealPlanSchema);
