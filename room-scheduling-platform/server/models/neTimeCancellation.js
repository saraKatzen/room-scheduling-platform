const mongoose = require('mongoose');

const oneTimeCancellationSchema = new mongoose.Schema({
  permanentAssignmentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'PermanentAssignment', // מקשר אותנו ישירות לשיבוץ הקבוע שמבטלים
    required: true 
  },
  roomId: { 
    type: String, // מותאם לאיך ששמרו ב-TempAssignment
    required: true 
  },
  cancellationDate: { 
    type: Date, // התאריך הספציפי של הביטול
    required: true 
  },
  startTime: { 
    type: String, // מותאם לאיך ששמרו ב-Scheme
    required: true 
  },
  endTime: { 
    type: String, 
    required: true 
  },
  notes: { 
    type: String 
  }
}, { timestamps: true });

module.exports = mongoose.model('OneTimeCancellation', oneTimeCancellationSchema);