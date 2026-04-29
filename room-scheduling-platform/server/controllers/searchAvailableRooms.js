import Room from "../models/Room.js";
export const searchAvailableRooms = async (req, res) => {
  try {
    const { 
      date,      // פורמט: YYYY-MM-DD
      startTime, // פורמט: "HH:mm"
      endTime,   // פורמט: "HH:mm"
      wing, 
      floor, 
      minCapacity, 
      needsProjector 
    } = medicalQuery; // נתוני החיפוש מה-Query String

    // 1. שלב ראשון: סינון בסיסי לפי מאפייני החדר
    let query = {};
    if (wing) query.wing = wing;
    if (floor) query.floor = floor;
    if (minCapacity) query.capacity = { $gte: minCapacity };
    if (needsProjector === 'true') query.hasProjector = true;

    const allCandidateRooms = await Room.find(query);

    // 2. שלב שני: סינון לוגי לפי זמן (זמינות)
    const availableRooms = allCandidateRooms.filter(room => {
      const searchDate = new Date(date);
      const dayOfWeek = searchDate.getDay() + 1; // המרה ל-1 (ראשון) עד 6 (שישי)

      // א. בדיקה האם החדר בוטל זמנית בתאריך זה (למשל חופש למבחן)
      // אם יש ביטול זמני - החדר נחשב פנוי (אלא אם מדובר בשיבוץ קבוע שרוצה לדעת שהתפנה)
      const isCancelled = room.temporaryCancellations.some(c => 
        c.date.toISOString().split('T')[0] === date
      );

      // ב. בדיקת התנגשות עם מערכת קבועה
      // אם החדר מבוטל זמנית בתאריך הזה - אנחנו מתעלמים מהמערכת הקבועה
      if (!isCancelled) {
        const hasRegularConflict = room.regularSchedule.some(s => {
          return s.dayOfWeek === dayOfWeek && 
                 isTimeOverlapping(s.startTime, s.endTime, startTime, endTime);
        });
        if (hasRegularConflict) return false;
      }

      // ג. בדיקת התנגשות עם שיבוצים זמניים (הזמנות קיימות)
      const hasTempConflict = room.temporaryBookings.some(b => {
        return b.date.toISOString().split('T')[0] === date &&
               isTimeOverlapping(b.startTime, b.endTime, startTime, endTime);
      });
      if (hasTempConflict) return false;

      return true; // החדר פנוי!
    });

    res.status(200).json(availableRooms);
  } catch (error) {
    res.status(500).json({ message: "שגיאה בחיפוש חדרים", error });
  }
};

// פונקציית עזר לבדיקת חפיפה בין זמנים
function isTimeOverlapping(start1, end1, start2, end2) {
  return start1 < end2 && start2 < end1;
}