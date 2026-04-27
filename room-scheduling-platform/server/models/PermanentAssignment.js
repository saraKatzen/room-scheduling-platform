const mongoose = require('mongoose');

const permanentAssignmentSchema = new mongoose.Schema({
  assignmentName: { type: String, required: true },
  roomNumber: { type: Number, required: true },
  assignedUser: { type: String, required: true },
  dayOfWeek: { type: String, enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('PermanentAssignment', permanentAssignmentSchema);