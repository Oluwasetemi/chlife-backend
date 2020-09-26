const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const appointmentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        purpose: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        appointmentTime: {
            type: Date,
            required: true,
        },
        type: {
            type: String,
            enum: ['INBODY', 'PROFESSIONAL'],
            required: true,
        },
        professional: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

// Export the model
module.exports = mongoose.model('Appointment', appointmentSchema);
