import express from 'express';
import searchController from '../controllers/searchController.js';
import e from 'express';
const router = express.Router();

// נתיב לחיפוש חדרים זמינים
router.get('/available-rooms', searchController.searchAvailableRooms);
export default router;
