const Assignment = require('../models/Assignment');

// 1. יצירת שיבוץ חדש (Create)
exports.createAssignment = async (req, res) => {
  try {
    // שיניתי מ-Scheme ל-Assignment
    const newAssignment = new Assignment(req.body);
    const savedAssignment = await newAssignment.save();
    res.status(201).json(savedAssignment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 2. קבלת כל השיבוצים (Read)
exports.getAllAssignments = async (req, res) => {
  try {
    // שיניתי מ-Scheme ל-Assignment
    const assignments = await Assignment.find();
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. עדכון שיבוץ קיים (Update)
exports.updateAssignment = async (req, res) => {
  try {
    // שיניתי מ-Scheme ל-Assignment
    const updatedAssignment = await Assignment.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } 
    );
    
    if (!updatedAssignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    
    res.status(200).json(updatedAssignment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 4. מחיקת שיבוץ (Delete)
exports.deleteAssignment = async (req, res) => {
  try {
    // שיניתי מ-Scheme ל-Assignment
    const deletedAssignment = await Assignment.findByIdAndDelete(req.params.id);
    
    if (!deletedAssignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    
    res.status(200).json({ message: "Assignment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};