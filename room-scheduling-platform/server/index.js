const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // חשוב מאוד כדי שהדפדפן לא יחסום את הבקשות
const app = express();
const PORT = process.env.PORT || 3000;
const Room = require('./models/Room');
const assignmentRoutes = require('./routes/assignmentRoutes');
const cancellationRoutes = require('./routes/cancellationRoutes');
// import roomRoutes from './routes/roomRoutes';
const roomRoutes = require('./routes/roomRoutes'); // הייבוא של הקובץ החדש
const roomController = require('./controllers/roomController'); // ודאי שהנתיב לקובץ מדויק
// Middleware
app.use(cors()); // מאפשר ל-React לגשת לשרת
app.use(express.json());
app.use('/api/assignments', assignmentRoutes);
app.use('/api/cancellations', cancellationRoutes);
// app.use('/api/room', roomRoutes);
app.use('/api/rooms', roomRoutes); // שימוש בנתיבים של החדרים
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
