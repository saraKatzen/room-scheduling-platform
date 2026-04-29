//  קודם כל מביאים את הכלי (mongoose) לתוך הקובץ הזה
const mongoose = require('mongoose');
const roomSchema = new mongoose.Schema({
  roomNumber: { type: Number, required: true, unique: true },
  wing: { type: String, required: true, enum: ['ימין', 'שמאל', 'אמצע', 'חדש'] },
  floor: { type: Number, required: true },
  capacity: { type: Number, required: true },
  hasProjector: { type: Boolean, default: false }
}, { timestamps: true });
//  מייצאים את המודל כדי שה-index.js וה-Controller יוכלו להשתמש בו
module.exports = mongoose.model('Room', roomSchema);