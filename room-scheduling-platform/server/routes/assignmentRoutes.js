import express from 'express';
import * as assignmentController from '../controllers/assignmentController.js';
const router = express.Router();

// נתיב ליצירה
router.post('/', assignmentController.createAssignment);

// נתיב לקבלת כולם
router.get('/', assignmentController.getAllAssignments);
router.put('/:id', assignmentController.updateAssignment); 
router.delete('/:id', assignmentController.deleteAssignment);
export default router;
