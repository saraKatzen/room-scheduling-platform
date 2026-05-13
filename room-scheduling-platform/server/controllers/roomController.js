import Room from '../models/Room.js';
import OneTimeCancellation from '../models/OneTimeCancellation.js';
import PermanentAssignment from '../models/PermanentAssignment.js';
import TempAssignment from '../models/TempAssignment.js'; // תוספת מה-main
import Assignment from '../models/Assignment.js'; // תוספת מה-main

// --- פונקציות הניהול הכלליות (מהמחשב שלך) ---

export const getRoom = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const postRoom = async (req, res) => {
    try {
        const newRoom = new Room(req.body);
        await newRoom.save();
        res.status(201).json(newRoom);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const putRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedRoom = await Room.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedRoom) return res.status(404).json({ message: "החדר לא נמצא" });
        res.json(updatedRoom);
    } catch (err) {
        res.status(400).json({ message: "שגיאה בעדכון החדר", error: err.message });
    }
};

export const deleteRoom = async (req, res) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        res.json({ message: "החדר נמחק בהצלחה" });
    } catch (err) {
        res.status(500).json({ message: "שגיאה במחיקה" });
    }
};

export const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) return res.status(404).json({ message: "החדר לא נמצא" });
        res.json(room);
    } catch (err) {
        res.status(500).json({ message: "שגיאה בשליפה" });
    }
};

// --- פונקציות ביטול (מהמחשב שלך) ---

export const addCancellation = async (req, res) => {
    try {
        const roomExists = await Room.findById(req.body.roomId);
        if (!roomExists) return res.status(404).json({ message: "החדר לא נמצא" });
        const newCancellation = new OneTimeCancellation(req.body);
        await newCancellation.save();
        res.status(201).json(newCancellation);
    } catch (error) {
        res.status(400).json({ message: "שגיאה", error: error.message });
    }
};

export const deleteCancellation = async (req, res) => {
    try {
        await OneTimeCancellation.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "הביטול נמחק" });
    } catch (error) {
        res.status(500).json({ message: "שגיאה", error: error.message });
    }
};

// --- המשימה שלך: שיבוצים קבועים (מהמחשב שלך) ---

export const createPermanentAssignment = async (req, res) => {
    try {
        const { roomId, dayOfWeek, startTime, endTime, assignmentName, assignedUser } = req.body;
        if (startTime >= endTime) return res.status(400).json({ message: "זמן לא תקין" });

        const overlapping = await PermanentAssignment.findOne({
            roomId, dayOfWeek,
            startTime: { $lt: endTime }, endTime: { $gt: startTime }
        });

        if (overlapping) return res.status(400).json({ message: "החדר תפוס" });

        const newAssignment = new PermanentAssignment(req.body);
        await newAssignment.save();
        res.status(201).json(newAssignment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePermanentAssignment = async (req, res) => {
    try {
        await PermanentAssignment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "השיבוץ נמחק" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- פונקציות ניקוי (תוספת מה-main כדי שלא יימחק להן) ---

export const clearAllAssignments = async (req, res) => {
    try {
        await Promise.all([
            Assignment.deleteMany({}),
            TempAssignment.deleteMany({}),
            PermanentAssignment.deleteMany({}),
            OneTimeCancellation.deleteMany({})
        ]);
        res.status(200).json({ message: "המערכת נוקתה" });
    } catch (err) {
        res.status(500).json({ message: "שגיאה", error: err.message });
    }
};