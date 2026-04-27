const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  // --- פרטי חדר בסיסיים ---
  roomNumber: { 
    type: Number, 
    required: true, 
    unique: true // מבטיח שלא יהיו כפילויות במספרי חדרים 
  },
  wing: { 
    type: String, 
    required: true,
    enum: ['ימין', 'שמאל', 'אמצע', 'חדש'] // הגבלה לאגפים המוגדרים בסמינר
  },
  floor: { 
    type: Number, 
    required: true 
  },
  capacity: { 
    type: Number, 
    required: true // גודל/קיבולת החדר 
  },
  hasProjector: { 
    type: Boolean, 
    default: false // האם קיים מקרן בחדר 
  },

  // --- מערכי ניהול (מומלץ לפי דף המשימות)  ---

  // מערך שיבוצים קבועים - המערכת השבועית 
  regularSchedule: [{
    dayOfWeek: { type: Number, min: 1, max: 6, required: true }, // 1=ראשון, 6=שישי
    startTime: { type: String, required: true }, // פורמט "HH:mm"
    endTime: { type: String, required: true },
    groupName: String, // שם המחזור המשובץ
    subject: String
  }],

  // מערך שיבוצים זמניים - בקשות חד פעמיות [cite: 8, 9]
  temporaryBookings: [{
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    purpose: String
  }],

  // מערך ביטולים זמניים - שחרור חדר לזמן מוגבל (חופש/מבחן) [cite: 11]
  temporaryCancellations: [{
    date: { type: Date, required: true },
    reason: { type: String, default: "הכנה למבחן" }
  }]

}, { timestamps: true }); // מוסיף זמן יצירה ועדכון אוטומטי

module.exports = mongoose.model('Room', roomSchema);