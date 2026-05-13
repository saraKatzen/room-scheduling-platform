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

// חשוב מאוד: ייצוא הראוטר כדי ש-index.js יוכל להשתמש בו
export default router;