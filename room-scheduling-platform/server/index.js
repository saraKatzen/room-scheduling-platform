import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Room from './models/Room.js';
import assignmentRoutes from './routes/assignmentRoutes.js';
import cancellationRoutes from './routes/cancellationRoutes.js';
import roomController from './controllers/roomController.js';
import roomRoutes from './routes/roomRoutes.js';
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // מאפשר ל-React לגשת לשרת
app.use(express.json());
app.use('/api/assignments', assignmentRoutes);
app.use('/api/cancellations', cancellationRoutes);
// app.use('/api/room', roomRoutes);
app.use('/api/rooms', roomRoutes); // שימוש בנתיבים של החדרים
app.use('/api/oneTimeCancellations', oneTimeCancellationRoutes);

// התחברות ל-MongoDB
const uri = "mongodb+srv://tehila7151_db_user:bF8PM7JfYXqNlhHg@cluster0.8t6moga.mongodb.net/room-scheduling-platform?retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.error("Could not connect to MongoDB", err));


// הפעלת השרת
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// שימוש בנתיבים
