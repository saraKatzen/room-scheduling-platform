const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  // --- פרטי חדר בסיסיים ---
  roomName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  wing: { 
    type: String, 
    required: true,
    enum: ['ימין', 'שמאל', 'אמצע', 'חדש'] // הגבלה לאגפים שביקשת
  },
  floor: { 
    type: Number, 
    required: true 
  },
  capacity: { 
    type: Number, 
    required: true 
  },
  hasProjector: { 
    type: Boolean, 
    default: false 
  },

  // --- מערך שיבוצים קבועים ---
  // מייצג את המערכת השבועית הקבועה של החדר 
  regularSchedule: [{
    dayOfWeek: { type: Number, min: 1, max: 6, required: true }, // 1=ראשון, 6=שישי
    startTime: { type: String, required: true }, // פורמט "HH:mm"
    endTime: { type: String, required: true },
    subject: String  }],

  // --- מערך שיבוצים זמניים/חד פעמיים ---
  // עבור בקשות לשיבוץ חד פעמי 
  temporaryBookings: [{
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    purpose: String
  }],

  // --- מערך ביטולים זמניים ---
  // מיועד למקרים בהם החדר מתפנה (למשל הכנה למבחן) 
  temporaryCancellations: [{
    date: { type: Date, required: true },
    reason: { type: String, default: "חופש/הכנה למבחן" }
  }]
}, { timestamps: true }); // מוסיף אוטומטית זמן יצירה ועדכון

module.exports = mongoose.model('Room', roomSchema);