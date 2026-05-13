import Room from '../models/Room.js';
import OneTimeCancellation from '../models/OneTimeCancellation.js';

import Assignment from '../models/Assignment.js';
import TempAssignment from '../models/TempAssignment.js';
import PermanentAssignment from '../models/PermanentAssignment.js';

// פונקציה למחיקת כל השיבוצים מכל הסוגים
export const clearAllAssignments = async (req, res) => {
    try {
        // מחיקה מכל הקולקשנים במקביל
        await Promise.all([
            Assignment.deleteMany({}),
            TempAssignment.deleteMany({}),
            PermanentAssignment.deleteMany({}),
            OneTimeCancellation.deleteMany({})
        ]);

        res.status(200).json({ message: "כל השיבוצים והביטולים נמחקו בהצלחה!" });
    } catch (err) {
        res.status(500).json({ message: "שגיאה בניקוי הנתונים", error: err.message });
    }
};

// 1. נתיב לקבלת כל החדרים (בשביל ה-React)
export const getRoom = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 2 נתיב להוספת חדר חדש
export const postRoom = async (req, res) => {
    try {
        const newRoom = new Room(req.body); 
        await newRoom.save(); 
        res.status(201).json(newRoom);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// עדכון פרטי חדר קיים לפי מזהה (ID)

export const putRoom = async (req, res) => {
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
};
// משימת שרת: CRUD - מחיקת חדר
export const deleteRoom = async (req, res) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        res.json({ message: "החדר נמחק בהצלחה" });
    } catch (err) {
        res.status(500).json({ message: "שגיאה במחיקה" });
    }
};

// משימת שרת: CRUD - קבלת פרטי חדר בודד
    export const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) return res.status(404).json({ message: "החדר לא נמצא" });
        res.json(room);
    } catch (err) {
        res.status(500).json({ message: "שגיאה בשליפה" });
    }
};

// פונקציה 1: הוספת ביטול חד פעמי לחדר ספציפי
export const addCancellation = async (req, res) => {
    try {
        // וודאנו שהחדר קיים
        const roomExists = await Room.findById(req.body.roomId);
        if (!roomExists) {
            return res.status(404).json({ message: "שגיאה: החדר שצוין לא נמצא במערכת" });
        }

        const newCancellation = new OneTimeCancellation(req.body);
        const savedCancellation = await newCancellation.save();
        res.status(201).json(savedCancellation);
    } catch (error) {
        res.status(400).json({ message: "שגיאה ביצירת הביטול", error: error.message });
    }
};

// פונקציה 2: מחיקת ביטול חד פעמי
export const deleteCancellation = async (req, res) => {
    try {
        const { id } = req.params; 
        const deletedCancellation = await OneTimeCancellation.findByIdAndDelete(id);
        
        if (!deletedCancellation) {
            return res.status(404).json({ message: "הביטול לא נמצא במערכת" });
        }
        
        res.status(200).json({ message: "הביטול נמחק בהצלחה" });
    } catch (error) {
        res.status(500).json({ message: "שגיאה בתהליך המחיקה", error: error.message });
    }
};