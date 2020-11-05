const Exercise = require('../models/exercise');

exports.insertManyExercise = async (data) => {
  const exercise = await Exercise.insertMany(data);

  if (!exercise) {
    throw new Error(
      'something dangerous happened while inserting data into the db'
    );
  }

  return exercise;
};

exports.removeAllExercise = async () => {
  const exercise = await Exercise.deleteMany({});

  if (!exercise) {
    throw new Error(
      'something dangerous happened while inserting data into the db'
    );
  }

  return exercise;
};

exports.oneExercise = async (id) => {
  const exercise = await Exercise.findOne({ id });

  if (!exercise) {
    throw new Error(' could not fetch exercise data');
  }

  return exercise;
};

exports.allExercise = async () => {
  const exercise = await Exercise.find({});

  if (!exercise) {
    throw new Error(' could not fetch exercise data');
  }

  return exercise;
};
