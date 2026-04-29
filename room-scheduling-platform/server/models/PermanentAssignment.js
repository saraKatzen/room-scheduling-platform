 import mongoose from 'mongoose';
 export const permanentAssignmentSchema = new mongoose.Schema({
  assignmentName: { type: String, required: true },
  // קישור לחדר לפי ה-ID שלו במסד הנתונים
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true }, 
  assignedUser: { type: String, required: true },
  dayOfWeek: { 
    type: String, 
    enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], 
    required: true 
  },
  startTime: { type: String, required: true }, // פורמט "08:00"
  endTime: { type: String, required: true },   // פורמט "10:00"
  isActive: { type: Boolean, default: true }
}, { timestamps: true });