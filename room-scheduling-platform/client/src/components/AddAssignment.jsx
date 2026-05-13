import React, { useState, useEffect } from 'react';

const AddAssignment = () => {
    const [rooms, setRooms] = useState([]);
    const [message, setMessage] = useState({ text: '', isError: false });
    const [formData, setFormData] = useState({
        roomId: '',
        assignmentName: '',
        assignedUser: '',
        dayOfWeek: 'Sunday',
        startTime: '',
        endTime: ''
    });

    // טעינת החדרים כדי שהמשתמש יוכל לבחור אחד מהם
    useEffect(() => {
        fetch('http://localhost:3000/api/rooms')
            .then(res => res.json())
            .then(data => setRooms(data))
            .catch(err => console.error("Error:", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: 'בודק זמינות...', isError: false });

        try {
            const response = await fetch('http://localhost:3000/api/rooms/assignments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                setMessage({ text: `השיבוץ "${result.assignmentName}" נקלט בהצלחה!`, isError: false });
            } else {
                // כאן השרת מחזיר את השגיאה של ההתנגשות
                setMessage({ text: result.message, isError: true });
            }
        } catch (err) {
            setMessage({ text: "שגיאה בתקשורת עם השרת", isError: true });
        }
    };

    return (
        <div style={{ direction: 'rtl', padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', color: '#2c3e50' }}>יצירת שיבוץ חדש</h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', backgroundColor: '#fdfdfd', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                
                <label>בחרי חדר:</label>
                <select required onChange={e => setFormData({...formData, roomId: e.target.value})} style={{ padding: '10px' }}>
                    <option value="">-- בחרי חדר מהרשימה --</option>
                    {rooms.map(room => (
                        <option key={room._id} value={room._id}>
                            אגף {room.wing}, חדר {room.roomNumber} (קומה {room.floor})
                        </option>
                    ))}
                </select>

                <input type="text" placeholder="שם השיבוץ (למשל: תגבור אנגלית)" required 
                    onChange={e => setFormData({...formData, assignmentName: e.target.value})} style={{ padding: '10px' }} />

                <input type="text" placeholder="שם המרצה/אחראי" required 
                    onChange={e => setFormData({...formData, assignedUser: e.target.value})} style={{ padding: '10px' }} />

                <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ flex: 1 }}>
                        <label>יום:</label>
                        <select style={{ width: '100%', padding: '10px' }} onChange={e => setFormData({...formData, dayOfWeek: e.target.value})}>
                            <option value="Sunday">ראשון</option>
                            <option value="Monday">שני</option>
                            <option value="Tuesday">שלישי</option>
                            <option value="Wednesday">רביעי</option>
                            <option value="Thursday">חמישי</option>
                            <option value="Friday">שישי</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ flex: 1 }}>
                        <label>שעת התחלה:</label>
                        <input type="time" required style={{ width: '100%', padding: '10px' }} onChange={e => setFormData({...formData, startTime: e.target.value})} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label>שעת סיום:</label>
                        <input type="time" required style={{ width: '100%', padding: '10px' }} onChange={e => setFormData({...formData, endTime: e.target.value})} />
                    </div>
                </div>

                <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
                    בדוק ושמור שיבוץ
                </button>

                {message.text && (
                    <div style={{ marginTop: '15px', padding: '10px', borderRadius: '5px', textAlign: 'center', backgroundColor: message.isError ? '#ffebee' : '#e8f5e9', color: message.isError ? '#c62828' : '#2e7d32' }}>
                        {message.text}
                    </div>
                )}
            </form>
        </div>
    );
};

export default AddAssignment;