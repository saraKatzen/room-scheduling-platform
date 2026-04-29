import express from 'express';
import * as cancellationController from '../controllers/cancellationController.js';
const router = express.Router();


// 1. נתיב להוספת ביטול חד-פעמי
// הכתובת המלאה תהיה: POST /api/cancellations
router.post('/', cancellationController.addCancellation);

// 2. נתיב למחיקת ביטול חד-פעמי לפי ה-ID שלו
// הכתובת המלאה תהיה: DELETE /api/cancellations/:id
router.delete('/:id', cancellationController.deleteCancellation);

export default router;
