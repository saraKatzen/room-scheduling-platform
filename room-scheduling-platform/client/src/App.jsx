import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom' // ייבוא הכלים של הניווט
import './App.css'
import RoomList from './components/RoomList'
import Navbar from './components/Navbar'

// אם יש לך קומפוננטת Home, ייבאי אותה. 
// אם אין לך עדיין, אפשר ליצור אחת זמנית או להשתמש ב-RoomList כברירת מחדל.
const Home = () => <div style={{ padding: '20px' }}>ברוכות הבאות למערכת שיבוץ חדרים</div>;

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* ה-Navbar נשאר קבוע למעלה */}
      <div className="container"> {/* אופציונלי: עטיפה לעיצוב התוכן שמתחת לסרגל */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<RoomList />} />
          {/* כאן תוכלו להוסיף בעתיד נתיבים כמו /add-room או /schedule */}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App