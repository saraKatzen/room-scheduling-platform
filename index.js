const express = require('express'); // חובה להוסיף
const mongoose = require('mongoose');
const app = express(); // חובה להוסיף

// החיבור למסד הנתונים
const dbURI = 'mongodb+srv://tehila7151_db_user:bF8PM7JfYXqNlhHg@cluster0.8t6moga.mongodb.net/rooms_db?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURI)
  .then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch((err) => console.error('Connection error:', err));

// הגדרת הסכימה
const roomSchema = new mongoose.Schema({
  wing: String,
  floor: Number,
  size: Number,
  hasProjector: Boolean
});

const Room = mongoose.model('Room', roomSchema);

// נתיב השליפה (GET)
app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await Room.find(); 
    res.json(rooms); 
  } catch (err) {
    res.status(500).json({ message: "Error fetching rooms", error: err.message });
  }
});

// הפעלת השרת - חובה!
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});