import mongoose from 'mongoose';

export const assignmentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  constraints: [String], 
  // שינוי שם השדה מ-room ל-roomId לסנכרון עם שאר המודלים
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' } 
}, { timestamps: true });
const Assignment = mongoose.model('Assignment', assignmentSchema);
export default Assignment;


