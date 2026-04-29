const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController'); // שימי לב לאות L אחת ב-Controller

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

// חשוב מאוד: ייצוא הראוטר כדי ש-index.js יוכל להשתמש בו
module.exports = router;