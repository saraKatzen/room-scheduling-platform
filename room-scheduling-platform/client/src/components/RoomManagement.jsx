import React, { useEffect, useState } from 'react';
import '../styles/RoomManagement.css';

const API_URL = 'http://localhost:3000/api/rooms';
const initialRoom = {
  wing: '',
  floor: '',
  roomNumber: '',
  hasProjector: false,
};

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState(initialRoom);
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('שגיאה בטעינת חדרים');
      const data = await res.json();
      setRooms(data);
    } catch (err) {
      setError(err.message || 'שגיאה בטעינת חדרים');
    } finally {
      setLoading(false);
    }
  };

  const filteredRooms = rooms.filter((room) => {
    const query = searchQuery.toLowerCase();
    return (
      room.wing.toLowerCase().includes(query) ||
      room.floor.toString().toLowerCase().includes(query) ||
      room.roomNumber.toString().toLowerCase().includes(query)
    );
  });





  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.wing || !formData.floor || !formData.roomNumber) {
      setError('יש למלא אגף, קומה ומספר חדר');
      return;
    }

    if (editingRoomId) {
      await updateRoom();
    } else {
      await addRoom();
    }
  };

  const addRoom = async () => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('שגיאה בהוספת החדר');
      await res.json();
      setMessage('החדר נוסף בהצלחה');
      setFormData(initialRoom);
      fetchRooms();
    } catch (err) {
      setError(err.message || 'שגיאה בהוספת החדר');
    }
  };

  const updateRoom = async () => {
    try {
      const res = await fetch(`${API_URL}/${editingRoomId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('שגיאה בעדכון החדר');
      await res.json();
      setMessage('החדר עודכן בהצלחה');
      setEditingRoomId(null);
      setFormData(initialRoom);
      fetchRooms();
    } catch (err) {
      setError(err.message || 'שגיאה בעדכון החדר');
    }
  };

  const deleteRoom = async (id) => {
    setError('');
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('שגיאה במחיקת החדר');
      setMessage('החדר נמחק בהצלחה');
      fetchRooms();
    } catch (err) {
      setError(err.message || 'שגיאה במחיקת החדר');
    }
  };

  const startEdit = (room) => {
    setEditingRoomId(room._id);
    setFormData({
      wing: room.wing || '',
      floor: room.floor || '',
      roomNumber: room.roomNumber || '',
      hasProjector: Boolean(room.hasProjector),
    });
    setMessage('עורך חדר קיים');
  };

  const cancelEdit = () => {
    setEditingRoomId(null);
    setFormData(initialRoom);
    setMessage('');
    setError('');
  };

  return (
    <div className="room-management-container">
      <header className="management-header">
        <h1>ניהול חדרים</h1>
        <p>הוסף, ערוך או מחק חדרים מהמערכת בקלות</p>
      </header>

      <div className="management-content">
        {/* סקשן טופס */}
        <div className="form-section">
          <h2>הוספה/עריכה של חדר</h2>
          
          {message && <div className="message-alert success">{message}</div>}
          {error && <div className="message-alert error">{error}</div>}

          <form onSubmit={handleSubmit} className="room-form">
            <div className="form-group">
              <label htmlFor="wing">אגף</label>
              <input
                id="wing"
                type="text"
                name="wing"
                value={formData.wing}
                onChange={handleChange}
                placeholder="הכנס שם אגף (א, ב, ג...)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="floor">קומה</label>
              <input
                id="floor"
                type="text"
                name="floor"
                value={formData.floor}
                onChange={handleChange}
                placeholder="הכנס מספר קומה"
              />
            </div>

            <div className="form-group">
              <label htmlFor="roomNumber">מספר חדר</label>
              <input
                id="roomNumber"
                type="text"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                placeholder="הכנס מספר חדר"
              />
            </div>

            <div className="form-group checkbox-group">
              <label htmlFor="hasProjector" className="checkbox-label">
                <input
                  id="hasProjector"
                  type="checkbox"
                  name="hasProjector"
                  checked={formData.hasProjector}
                  onChange={handleChange}
                />
                <span>המכיל מקרן</span>
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingRoomId ? '✏️ עדכן חדר' : '➕ הוסף חדר'}
              </button>
              {editingRoomId && (
                <button type="button" onClick={cancelEdit} className="btn btn-cancel">
                  ❌ ביטול עריכה
                </button>
              )}
            </div>
          </form>
        </div>

        {/* סקשן רשימת חדרים */}
        <div className="rooms-section">
          <div className="rooms-header">
            <h2>רשימת חדרים</h2>
            <div className="search-container">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="חיפוש לפי אגף, קומה או מספר חדר..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="rooms-count">
            נמצאו <span className="count">{filteredRooms.length}</span> חדרים
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>טוען חדרים...</p>
            </div>
          ) : filteredRooms.length === 0 ? (
            <div className="empty-state">
              <p className="empty-icon">📭</p>
              <p>לא נמצאו חדרים</p>
            </div>
          ) : (
            <div className="rooms-list">
              {filteredRooms.map((room) => (
                <div key={room._id} className="room-card">
                  <div className="room-info">
                    <div className="room-header">
                      <span className="room-badge">{room.wing} | {room.floor} | {room.roomNumber}</span>
                      {room.hasProjector && <span className="projector-badge">📽️ מקרן</span>}
                    </div>
                    <div className="room-details">
                      <span className="detail-item">
                        <strong>אגף:</strong> {room.wing}
                      </span>
                      <span className="detail-item">
                        <strong>קומה:</strong> {room.floor}
                      </span>
                      <span className="detail-item">
                        <strong>חדר:</strong> {room.roomNumber}
                      </span>
                    </div>
                  </div>
                  <div className="room-actions">
                    <button
                      type="button"
                      onClick={() => startEdit(room)}
                      className="btn-icon btn-edit"
                      title="עדכן חדר"
                    >
                      ✏️
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteRoom(room._id)}
                      className="btn-icon btn-delete"
                      title="מחק חדר"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomManagement;
