const Appointment = require('../models/appointment');

exports.createAppointment = (data) => Appointment.create(data);

exports.findOneByEmail = (email) => Appointment.findOne({ email });

exports.findOneBasedOnQuery = (data) => Appointment.findOne(data);

exports.findBasedOnQuery = (data) => Appointment.find(data);

exports.findAppointmentById = (id) => Appointment.findById(id);

exports.findAllAppointments = (query = {}) => Appointment.find(query);

exports.removeAppointment = (id) => Appointment.findByIdAndRemove(id);

exports.updateAppointment = (query, data) =>
  Appointment.findOneAndUpdate(query, data, {
    new: true,
    runValidators: true,
  });

exports.deleteAppointmentByEmail = (email) => Appointment.deleteOne({ email });

exports.search = (searchParams) =>
  Appointment.find({
    $text: {
      $search: searchParams,
    },
    score: { $meta: 'textScore' },
  }).sort({ score: { $meta: 'textScore' } });
