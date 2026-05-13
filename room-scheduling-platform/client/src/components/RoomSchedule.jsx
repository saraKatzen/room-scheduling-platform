import React, { useState, useEffect } from 'react';
import axios from 'axios'; // או fetch, לפי מה שנוח לך
import '../styles/RoomSchedule.css';

const RoomSchedule = () => {
  const [rooms, setRooms] = useState([]); // רשימת כל החדרים לבחירה
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [schedule, setSchedule] = useState({});
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
    try {
      setLoading(true);
      if (selectedDate) {
        // יומי
        const res = await axios.get(`/api/rooms/${selectedRoom}/schedule?date=${selectedDate}`);
        setSchedule(res.data);
      } else {
        // שבועי
        const res = await axios.get(`/api/rooms/${selectedRoom}/weekly-schedule`);
        setSchedule(res.data);
      }
    } catch (err) {
      console.error('שגיאה בטעינת המערכת:', err);
      setSchedule({});
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAllAssignments = async () => {
    if (window.confirm('האם את בטוחה שברצונך למחוק את כל השיבוצים לחדר זה?')) {
      try {
        await axios.delete('/api/rooms/clear-all');
        alert('כל השיבוצים נמחקו');
        fetchRoomSchedule(); // רענן את המערכת
      } catch (err) {
        alert('שגיאה במחיקה');
      }
    }
  };

  return (
    <div className="schedule-page">
      <div className="schedule-card">
        <div className="schedule-header">
          <div>
            <span className="schedule-badge">לוח זמנים</span>
            <h2>מערכת ניהול חדרים</h2>
            <p>בחר חדר ותאריך כדי לראות את השיבוצים הקבועים והזמניים.</p>
          </div>
          {selectedRoom && (
            <div className="schedule-keynotes">
              <span className="dot permanent" /> קבוע
              <span className="dot temp" /> זמני
            </div>
          )}
        </div>

        <div className="filters">
          <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
            <option value="">בחר חדר...</option>
            {rooms.map(room => (
              <option key={room._id} value={room._id}>{room.roomNumber} - אגף {room.wing}</option>
            ))}
          </select>

          <input
            type="date"
            value={selectedDate || ''}
            onChange={(e) => setSelectedDate(e.target.value || null)}
          />

          {selectedDate ? (
            <button className="secondary-btn" onClick={() => setSelectedDate(null)}>
              חזור לשבועי
            </button>
          ) : (
            <button className="secondary-btn" disabled={!selectedRoom}>
              הצג שבועי
            </button>
          )}
        </div>

        <div className="schedule-display">
          {loading ? (
            <div className="loading-state">טוען...</div>
          ) : selectedRoom ? (
            selectedDate ? (
              <div>
                <div className="daily-header">
                  <h3>תצוגה יומית: {selectedDate}</h3>
                  <button className="primary-btn">הוסף שיבוץ זמני</button>
                </div>
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
                    {Array.isArray(schedule) && schedule.length > 0 ? (
                      schedule.map((item, index) => (
                        <tr key={index} className={item.isTemp ? 'temp-row' : 'perm-row'}>
                          <td>{item.startTime} - {item.endTime}</td>
                          <td>{item.assignmentName || item.assignedTo}</td>
                          <td>{item.isTemp ? 'זמני' : 'קבוע'}</td>
                          <td>
                            <button className="small-btn">עדכון</button>
                            <button className="small-btn outline">מחיקה</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="empty-state">אין שיבוצים להצגה לתאריך זה.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div>
                <h3>מערכת שבועית קבועה</h3>
                <table className="weekly-table">
                  <thead>
                    <tr>
                      <th>זמן</th>
                      <th>ראשון</th>
                      <th>שני</th>
                      <th>שלישי</th>
                      <th>רביעי</th>
                      <th>חמישי</th>
                      <th>שישי</th>
                      <th>שבת</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(schedule).length > 0 ? (
                      <tr>
                        <td>שיבוצים</td>
                        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                          <td key={day}>
                            {schedule[day] && schedule[day].length > 0 ? (
                              schedule[day].map((item, idx) => (
                                <div key={idx} className="weekly-item">
                                  <strong>{item.startTime}-{item.endTime}</strong>
                                  <span>{item.assignmentName}</span>
                                </div>
                              ))
                            ) : (
                              <span className="weekly-empty">אין נתונים</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="8" className="empty-state">בחר חדר כדי לראות את המערכת השבועית.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            <div className="empty-state">אנא בחרי חדר כדי להתחיל.</div>
          )}
        </div>

        {selectedRoom && (
          <div className="actions">
            <button className="primary-btn" onClick={() => handleDeleteAllAssignments()}>
              מחק את כל השיבוצים לחדר
            </button>
            <button className="outline-btn">עדכן שיבוץ קבוע</button>
            <button className="outline-btn">הוסף ביטול חד פעמי</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomSchedule;