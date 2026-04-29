import OneTimeCancellation from '../models/OneTimeCancellation.js';
// CRUD operations for OneTimeCancellation
// Create, Read (all and by ID), Update, Delete.
// כל הפונקציות האלו הן אסינכרוניות כי הן מתקשרות עם מסד הנתונים
// פונקציה לקבלת כל הביטולים
export const getAllCancellations = async (req, res) => {
  try {
    const cancellations = await OneTimeCancellation
      .find()
      .populate('roomId')
      .populate('permanentAssignmentId');

    res.json(cancellations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// פונקציה ליצירת ביטול חדש
export const createCancellation = async (req, res) => {
  try {
    const cancellation = new OneTimeCancellation(req.body);
    await cancellation.save();
    res.status(201).json(cancellation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// פונקציה לקבלת ביטול לפי מזהה (ID)
export const getCancellationById = async (req, res) => {
  try {
    const cancellation = await OneTimeCancellation
      .findById(req.params.id)
      .populate('roomId')
      .populate('permanentAssignmentId');

    if (!cancellation) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json(cancellation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// פונקציה לעדכון ביטול קיים לפי מזהה (ID)
export const updateCancellation = async (req, res) => {
  try {
    const updated = await OneTimeCancellation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// פונקציה למחיקת ביטול לפי מזהה (ID)
export const deleteCancellation = async (req, res) => {
  try {
    const deleted = await OneTimeCancellation.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};