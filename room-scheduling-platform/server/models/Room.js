import mongoose from 'mongoose';
export const roomSchema = new mongoose.Schema({
  roomNumber: { type: Number, required: true, unique: true },
  wing: { type: String, required: true, enum: ['ימין', 'שמאל', 'אמצע', 'חדש'] },
  floor: { type: Number, required: true },
  capacity: { type: Number, required: true },
  hasProjector: { type: Boolean, default: false }
}, { timestamps: true });