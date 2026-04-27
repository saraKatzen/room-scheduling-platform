const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  days: [{ type: String, enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] }],
  startTime: String,
  endTime: String,
  constraints: [String] 
}, { timestamps: true });

module.exports = mongoose.model('Scheme', schemeSchema);