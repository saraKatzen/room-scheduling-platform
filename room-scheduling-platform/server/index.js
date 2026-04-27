const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // חשוב מאוד כדי שהדפדפן לא יחסום את הבקשות
const app = express();
const PORT = process.env.PORT || 3000;
const Room = require('./models/Room');
const assignmentRoutes = require('./routes/assignmentRoutes');

// Middleware
app.use(cors()); // מאפשר ל-React לגשת לשרת
app.use(express.json());
app.use('/api/assignments', assignmentRoutes);
// התחברות ל-MongoDB
const uri = "mongodb+srv://tehila7151_db_user:bF8PM7JfYXqNlhHg@cluster0.8t6moga.mongodb.net/room-scheduling-platform?retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.error("Could not connect to MongoDB", err));


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

// עדכון פרטי חדר קיים לפי מזהה (ID)
app.put('/api/rooms/:id', async (req, res) => {
    try {
        const { id } = req.params; // מקבל את ה-ID מהכתובת
        const updatedData = req.body; // מקבל את הנתונים החדשים מה-body של הבקשה

        // מחפש ומעדכן. { new: true } גורם לו להחזיר את האובייקט המעודכן
        const updatedRoom = await Room.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedRoom) {
            return res.status(404).json({ message: "החדר לא נמצא" });
        }

        res.json(updatedRoom); // מחזיר את החדר המעודכן לבדיקה
    } catch (err) {
        res.status(400).json({ message: "שגיאה בעדכון החדר", error: err.message });
    }
});

// הפעלת השרת
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// שימוש בנתיבים
app.use('/api/assignments', assignmentRoutes);