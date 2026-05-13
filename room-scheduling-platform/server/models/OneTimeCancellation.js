import mongoose from 'mongoose';

const oneTimeCancellationSchema = new mongoose.Schema({
  permanentAssignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'PermanentAssignment', required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  cancellationDate: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  notes: { type: String }
}, { timestamps: true });

const OneTimeCancellation = mongoose.model('OneTimeCancellation', oneTimeCancellationSchema);

export default OneTimeCancellation;
