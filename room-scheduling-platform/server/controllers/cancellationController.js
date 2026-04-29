// ייבוא המודל שעדכנת בשלב הקודם
import OneTimeCancellation from "../models/OneTimeCancellation.js";
// פונקציה 1: הוספת ביטול חד פעמי
exports.addCancellation = async (req, res) => {
    try {
        // יצירת אובייקט ביטול חדש מהנתונים שהגיעו מהלקוח (req.body)
        const newCancellation = new OneTimeCancellation(req.body);
        
        // שמירה במסד הנתונים
        const savedCancellation = await newCancellation.save();
        
        // החזרת תשובה חיובית ללקוח
        res.status(201).json(savedCancellation);
    } catch (error) {
        // במקרה של שגיאה (למשל חסר שדה חובה)
        res.status(400).json({ message: "שגיאה ביצירת הביטול", error: error.message });
    }
};

// פונקציה 2: מחיקת ביטול חד פעמי
exports.deleteCancellation = async (req, res) => {
    try {
        const { id } = req.params; // מקבלים את ה-ID מהכתובת (URL)
        
        // חיפוש ומחיקה לפי ה-ID
        const deletedCancellation = await OneTimeCancellation.findByIdAndDelete(id);
        
        if (!deletedCancellation) {
            return res.status(404).json({ message: "הביטול לא נמצא במערכת" });
        }
        
        res.status(200).json({ message: "הביטול נמחק בהצלחה" });
    } catch (error) {
        res.status(500).json({ message: "שגיאה בתהליך המחיקה", error: error.message });
    }
};