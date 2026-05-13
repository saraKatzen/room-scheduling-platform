import Room from '../models/Room.js';
import TempAssignment from '../models/TempAssignment.js';
import PermanentAssignment from '../models/PermanentAssignment.js';
import OneTimeCancellation from '../models/OneTimeCancellation.js';
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
// פונקציית עזר לבדיקת חפיפה בין זמנים (כדי למנוע כפל קוד בעתיד, נוכל להוציא אותה לקובץ Utils)
const isTimeOverlapping = (start1, end1, start2, end2) => {
    return start1 < end2 && start2 < end1;
};
// פונקציה 3: הוספת שיבוץ זמני עם בדיקות התנגשות מול שיבוצים קבועים וביטולים חד פעמיים
export const addTempAssignment = async (req, res) => {
    try {
        const { roomId, date, startTime, endTime, assignedTo } = req.body;
        const searchDate = new Date(date);
        const dayOfWeek = searchDate.toLocaleDateString('en-US', { weekday: 'long' }); // מקבל את היום בשבוע (למשל 'Monday')

        // 1. בדיקה מול שיבוצים קבועים
        const permanentConflicts = await PermanentAssignment.find({ 
            roomId, 
            dayOfWeek,
            isActive: true 
        });

        for (let perm of permanentConflicts) {
            if (isTimeOverlapping(perm.startTime, perm.endTime, startTime, endTime)) {
                // בדיקה אם השיבוץ הקבוע הזה בוטל ספציפית לתאריך הזה
                const isCancelled = await OneTimeCancellation.findOne({
                    permanentAssignmentId: perm._id,
                    cancellationDate: searchDate
                });

                if (!isCancelled) {
                    return res.status(400).json({ message: "קיימת התנגשות עם שיבוץ קבוע בחדר זה" });
                }
            }
        }

        // 2. בדיקה מול שיבוצים זמניים קיימים
        const existingTempAssignments = await TempAssignment.find({ roomId, date: searchDate });
        const hasTempConflict = existingTempAssignments.some(assign => 
            isTimeOverlapping(assign.startTime, assign.endTime, startTime, endTime)
        );

        if (hasTempConflict) {
            return res.status(400).json({ message: "החדר כבר תפוס בשיבוץ זמני אחר בשעות אלו" });
        }

        // 3. אם עברנו את כל הבדיקות - יוצרים את השיבוץ (שימוש ב-CRUD הבסיסי של המודל)
        const newTempAssignment = new TempAssignment(req.body);
        await newTempAssignment.save();
        
        res.status(201).json({ message: "השיבוץ הזמני נקלט בהצלחה", data: newTempAssignment });

    } catch (error) {
        res.status(500).json({ message: "שגיאה בביצוע השיבוץ", error: error.message });
    }
};
// פונקציה 4: מחיקת שיבוץ זמני ספציפי לפי מזהה (ID)
export const deleteTempAssignment = async (req, res) => {
    try {
        const { id } = req.params; // המזהה של השיבוץ הספציפי שאנחנו רוצים למחוק

        // שימוש במודל TempAssignment לביצוע המחיקה
        const deletedAssignment = await TempAssignment.findByIdAndDelete(id);

        if (!deletedAssignment) {
            return res.status(404).json({ message: "השיבוץ לא נמצא במערכת" });
        }

        res.status(200).json({ message: "השיבוץ הזמני נמחק בהצלחה" });
    } catch (error) {
        res.status(500).json({ message: "שגיאה במחיקת השיבוץ", error: error.message });
    }
};