import express from 'express';
// מייבאים את הקונטרולר המאוחד
import * as roomController from '../controllers/roomController.js';

const router = express.Router();

// --- ניהול חדרים כללי ---
router.get('/', roomController.getRoom);
router.post('/', roomController.postRoom);
router.get('/:id', roomController.getRoomById);
router.put('/:id', roomController.putRoom);
router.delete('/:id', roomController.deleteRoom);

// --- ביטולים חד-פעמיים ---
router.post('/cancellations', roomController.addCancellation);
router.delete('/cancellations/:id', roomController.deleteCancellation);

// --- שיבוצים קבועים (המשימה שלך) ---
router.post('/assignments', roomController.createPermanentAssignment);
router.delete('/assignments/:id', roomController.deletePermanentAssignment);

// --- שיבוצים זמניים וניהול שוטף (המשימות של הצוות) ---
router.post('/temp-assignments', roomController.addTempAssignment);
router.delete('/temp-assignments/:id', roomController.deleteTempAssignment);
router.delete('/clear-all', roomController.clearAllAssignments);

// ייצוא הראוטר
export default router;