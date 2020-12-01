const MealPlan = require('../models/mealplan');

exports.createMealPlan = (data) => MealPlan.create(data);

exports.findOneMealPlan = (id) => MealPlan.findOne({ _id: id });

exports.findOneMealPlanBasedOnQuery = (data) => MealPlan.findOne(data);

exports.findMealPlanBasedOnQuery = (data) => MealPlan.find(data);

exports.findMealPlanById = (id) => MealPlan.findById(id);

exports.findAllMealPlans = (query = {}) => MealPlan.find(query);

exports.removeMealPlan = (id) => MealPlan.findByIdAndRemove(id);

exports.updateMealPlan = (query, data) =>
  MealPlan.findOneAndUpdate(query, data, {
    new: true,
    runValidators: true,
  });

exports.deleteOneMealPlan = (id) => MealPlan.deleteOne({ id });

exports.search = (searchParams) =>
  MealPlan.find({
    $text: {
      $search: searchParams,
    },
    score: { $meta: 'textScore' },
  }).sort({ score: { $meta: 'textScore' } });
