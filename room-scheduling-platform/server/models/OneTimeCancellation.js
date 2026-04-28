const mongoose = require('mongoose');

const oneTimeCancellationSchema = new mongoose.Schema({
  // קישור לשיבוץ הספציפי שאותו מבטלים
  permanentAssignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'PermanentAssignment', required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  cancellationDate: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('OneTimeCancellation', oneTimeCancellationSchema);