const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  // שם השיבוץ (למשל: "שיעור מחשבים")
  name: { type: String, required: true, trim: true },
  
  // זמנים - חובה בכל סוג של שיבוץ
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  
  // הגבלות (למשל: "צריך מקרן", "מינימום 20 מקומות")
  constraints: [String],
  
  // הקישור לחדר (חשוב מאוד למערכת חדרים!)
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' }
  
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);