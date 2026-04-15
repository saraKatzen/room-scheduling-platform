import React, { useEffect, useState } from 'react';

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // פנייה לשרת ה-Node.js
        fetch('http://localhost:3000/api/rooms')
            .then(res => res.json())
            .then(data => {
                setRooms(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching rooms:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p style={{textAlign: 'center'}}>טוען חדרים מהשרת...</p>;

    return (
        <div style={{ direction: 'rtl', padding: '20px', fontFamily: 'Arial' }}>
            <h2 style={{ color: '#2c3e50' }}>רשימת חדרים זמינים</h2>
            {rooms.length === 0 ? (
                <p>לא נמצאו חדרים. ודאי שהכנסת נתונים ל-MongoDB.</p>
            ) : (
                <div style={{ display: 'grid', gap: '15px' }}>
                    {rooms.map(room => (
                        <div key={room._id} style={{ 
                            border: '1px solid #ddd', 
                            padding: '15px', 
                            borderRadius: '8px',
                            backgroundColor: '#f9f9f9'
                        }}>
                            <strong>אגף:</strong> {room.wing} | 
                            <strong> קומה:</strong> {room.floor} | 
                            <strong> חדר:</strong> {room.roomNumber}
                            {room.hasProjector && <span style={{color: 'green'}}> (יש מקרן 📽️)</span>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RoomList;
