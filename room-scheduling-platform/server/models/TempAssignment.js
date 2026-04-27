const mongoose = require('mongoose');

const tempAssignmentSchema = new mongoose.Schema({
  schemeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Scheme', required: true },
  roomId: { type: String, required: true },
  assignedTo: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'draft', 'review'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('TempAssignment', tempAssignmentSchema);