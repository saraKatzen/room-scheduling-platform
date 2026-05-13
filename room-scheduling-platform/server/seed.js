import mongoose from 'mongoose';
import Room from './models/Room.js';

// ה-URI שלך מה-index.js
const uri = "mongodb+srv://tehila7151_db_user:bF8PM7JfYXqNlhHg@cluster0.8t6moga.mongodb.net/room-scheduling-platform?retryWrites=true&w=majority";

const roomsData = [
  { roomNumber: 428, wing: 'ימין', floor: 4, capacity: 35, hasProjector: true },
  { roomNumber: 328, wing: 'ימין', floor: 3, capacity: 30, hasProjector: false },
  { roomNumber: 323, wing: 'ימין', floor: 3, capacity: 30, hasProjector: true },
  { roomNumber: 324, wing: 'ימין', floor: 4, capacity: 25, hasProjector: false },
  { roomNumber: 424, wing: 'ימין', floor: 4, capacity: 30, hasProjector: true },
  { roomNumber: 321, wing: 'ימין', floor: 3, capacity: 40, hasProjector: true },
  { roomNumber: 327, wing: 'ימין', floor: 3, capacity: 30, hasProjector: false },
  { roomNumber: 315, wing: 'שמאל', floor: 3, capacity: 30, hasProjector: true },
  { roomNumber: 314, wing: 'שמאל', floor: 3, capacity: 20, hasProjector: false },
  { roomNumber: 313, wing: 'שמאל', floor: 3, capacity: 30, hasProjector: true },
  { roomNumber: 417, wing: 'שמאל', floor: 4, capacity: 30, hasProjector: false },
  { roomNumber: 317, wing: 'שמאל', floor: 3, capacity: 25, hasProjector: true },
  { roomNumber: 415, wing: 'שמאל', floor: 4, capacity: 35, hasProjector: false },
  { roomNumber: 318, wing: 'שמאל', floor: 3, capacity: 30, hasProjector: true },
  { roomNumber: 516, wing: 'שמאל', floor: 5, capacity: 30, hasProjector: false },
  { roomNumber: 511, wing: 'שמאל', floor: 5, capacity: 30, hasProjector: true },
  { roomNumber: 523, wing: 'ימין', floor: 5, capacity: 20, hasProjector: false },
  { roomNumber: 521, wing: 'ימין', floor: 5, capacity: 30, hasProjector: true },
  { roomNumber: 524, wing: 'ימין', floor: 5, capacity: 30, hasProjector: false },
  { roomNumber: 515, wing: 'שמאל', floor: 5, capacity: 35, hasProjector: true },
  { roomNumber: 512, wing: 'שמאל', floor: 5, capacity: 30, hasProjector: false },
  { roomNumber: 213, wing: 'שמאל', floor: 2, capacity: 30, hasProjector: true },
  { roomNumber: 217, wing: 'שמאל', floor: 2, capacity: 30, hasProjector: false },
  { roomNumber: 212, wing: 'שמאל', floor: 2, capacity: 25, hasProjector: true },
  { roomNumber: 218, wing: 'שמאל', floor: 2, capacity: 30, hasProjector: false }
];

async function seedDB() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to DB for seeding...");

    // מחיקת חדרים קיימים כדי שלא יהיו כפילויות בבדיקה
    await Room.deleteMany({});
    
    // הכנסת החדרים החדשים שחילצנו מהאקסל
    await Room.insertMany(roomsData);
    
    console.log("Successfully seeded 25 rooms!");
    process.exit();
  } catch (err) {
    console.error("Error seeding DB:", err);
    process.exit(1);
  }
}

seedDB();