import express from 'express';
// מייבאים את הקונטרולר המאוחד שבו נמצאות הפונקציות של כולכן
import * as roomController from '../controllers/roomController.js';

const router = express.Router();
// 1. נתיב לקבלת כל החדרים
// הכתובת המלאה תהיה /api/rooms/
router.get('/', roomController.getRoom);

// 2. נתיב להוספת חדר חדש
router.post('/', roomController.postRoom);

// 3. קבלת פרטי חדר בודד לפי ID
// הכתובת המלאה תהיה /api/rooms/:id
router.get('/:id', roomController.getRoomById);

// 4. עדכון חדר
router.put('/:id', roomController.putRoom);

// 5. מחיקת חדר
router.delete('/:id', roomController.deleteRoom);

// הוספת ביטול חד-פעמי: POST /api/rooms/cancellations
router.post('/cancellations', roomController.addCancellation);

// מחיקת ביטול חד-פעמי: DELETE /api/rooms/cancellations/:id
router.delete('/cancellations/:id', roomController.deleteCancellation);


// נתיב למחיקת כל השיבוצים (נשתמש ב-DELETE)
router.delete('/clear-all', roomController.clearAllAssignments);

// חשוב מאוד: ייצוא הראוטר כדי ש-index.js יוכל להשתמש בו
// module.exports = router;

// נתיב להוספת שיבוץ זמני (POST)
router.post('/temp-assignments', roomController.addTempAssignment);

// נתיב למחיקת שיבוץ זמני (DELETE) לפי ה-ID של השיבוץ
router.delete('/temp-assignments/:id', roomController.deleteTempAssignment);

// נתיב לקבלת מערכת שבועית לחדר
router.get('/:id/weekly-schedule', roomController.getRoomWeeklySchedule);

// נתיב לקבלת מערכת לחדר לפי תאריך
router.get('/:id/schedule', roomController.getRoomSchedule);

// חשוב מאוד: ייצוא הראוטר כדי ש-index.js יוכל להשתמש בו

export default router;