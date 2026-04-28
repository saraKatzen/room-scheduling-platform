const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');

// נתיב ליצירה
router.post('/', assignmentController.createAssignment);

// נתיב לקבלת כולם
router.get('/', assignmentController.getAllAssignments);
router.put('/:id', assignmentController.updateAssignment); 
router.delete('/:id', assignmentController.deleteAssignment);
module.exports = router;