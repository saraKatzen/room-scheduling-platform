const express = require('express');
const router = express.Router();

// ייבוא הקונטרולר שיצרנו בשלב הקודם
const cancellationController = require('../controllers/cancellationController');

// 1. נתיב להוספת ביטול חד-פעמי
// הכתובת המלאה תהיה: POST /api/cancellations
router.post('/', cancellationController.addCancellation);

// 2. נתיב למחיקת ביטול חד-פעמי לפי ה-ID שלו
// הכתובת המלאה תהיה: DELETE /api/cancellations/:id
router.delete('/:id', cancellationController.deleteCancellation);

module.exports = router;