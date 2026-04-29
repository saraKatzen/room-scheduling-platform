import mongoose from 'mongoose';
export  const tempAssignmentSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  assignedTo: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  status: { type: String, enum: ['pending', 'draft', 'review'], default: 'pending' }
}, { timestamps: true });

const TempAssignment = mongoose.model('TempAssignment', tempAssignmentSchema);
export default TempAssignment;