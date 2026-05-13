import React, { useState, useEffect } from 'react';
import axios from 'axios'; // או fetch, לפי מה שנוח לך

const RoomSchedule = () => {
  const [rooms, setRooms] = useState([]); // רשימת כל החדרים לבחירה
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [schedule, setSchedule] = useState([]);
const [loading, setLoading] = useState(true); // ניהול מצב טעינה

useEffect(() => {
    // פונקציה פנימית לביצוע הקריאה
    const fetchRoomsData = async () => {
        try {
            setLoading(true);
            // שימי לב: ודאי שהפורט (3000) תואם למה שהגדרת בשרת ה-Node.js שלך
            const response = await fetch('http://localhost:3000/api/rooms');
            const data = await response.json();
            
            // הגנה: מוודאים שקיבלנו מערך לפני שמעדכנים
            setRooms(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("שגיאה במשיכת חדרים:", err);
            setRooms([]); // במקרה של שגיאה נשאיר מערך ריק למניעת קריסה
        } finally {
            setLoading(false); // הפסקת מצב טעינה בכל מקרה
        }
    };

    fetchRoomsData();
}, []);

  // בכל פעם שחדר או תאריך משתנים - נמשוך את המערכת
  useEffect(() => {
    if (selectedRoom) {
      fetchRoomSchedule();
    }
  }, [selectedRoom, selectedDate]);

  const fetchRoomSchedule = async () => {
    // כאן תבוא קריאה שמביאה גם קבועים וגם זמניים לפי roomId ותאריך
    const res = await axios.get(`/api/rooms/${selectedRoom}/schedule?date=${selectedDate}`);
    setSchedule(res.data);
  };

  return (
    <div className="schedule-container">
      <h2>מערכת חדר</h2>
      
      {/* בחירת חדר ותאריך */}
      <div className="filters">
        <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
          <option value="">בחר חדר...</option>
          {rooms.map(room => (
            <option key={room._id} value={room._id}>{room.roomNumber} - אגף {room.wing}</option>
          ))}
        </select>

        <input 
          type="date" 
          value={selectedDate} 
          onChange={(e) => setSelectedDate(e.target.value)} 
        />
      </div>

      {/* הצגת המערכת */}
      <div className="schedule-display">
        {selectedRoom ? (
          <table className="schedule-table">
            <thead>
              <tr>
                <th>שעה</th>
                <th>שיבוץ</th>
                <th>סוג</th>
                <th>פעולות</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((item, index) => (
                <tr key={index} className={item.isTemp ? 'temp-row' : ''}>
                  <td>{item.startTime} - {item.endTime}</td>
                  <td>{item.assignmentName || item.assignedTo}</td>
                  <td>{item.isTemp ? 'זמני' : 'קבוע'}</td>
                  <td>
                    {/* כאן יבואו הכפתורים לשלב הבא (מחיקה/עדכון/ביטול) */}
                    <button>עדכון</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>אנא בחרי חדר לצפייה במערכת</p>
        )}
      </div>
    </div>
  );
};

export default RoomSchedule;