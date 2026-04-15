const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // חשוב מאוד כדי שהדפדפן לא יחסום את הבקשות
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // מאפשר ל-React לגשת לשרת
app.use(express.json());

// התחברות ל-MongoDB
const uri = "mongodb+srv://tehila7151_db_user:bF8PM7JfYXqNlhHg@cluster0.8t6moga.mongodb.net/room-scheduling-platform?retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.error("Could not connect to MongoDB", err));

// הגדרת המודל
const roomSchema = new mongoose.Schema({
  wing: String,
  floor: Number,
  roomNumber: Number,
  hasProjector: Boolean
});

const Room = mongoose.model('Room', roomSchema);

// --- נתיבים (Routes) ---

// 1. נתיב לקבלת כל החדרים (בשביל ה-React)
app.get('/api/rooms', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. נתיב להוספת חדר חדש
app.post('/api/rooms', async (req, res) => {
    try {
        const newRoom = new Room(req.body); 
        await newRoom.save(); 
        res.status(201).json(newRoom);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// הפעלת השרת
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});