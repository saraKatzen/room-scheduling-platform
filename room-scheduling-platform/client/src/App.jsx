import { useState } from 'react'
import './App.css'
import RoomList from './components/RoomList'

function App() {
  return (
    <>
      <section id="center">
        <div className="hero">
          <h1>מערכת ניהול חדרים</h1>
          <p>פרויקט גמר - הצגת נתונים מה-Database</p>
        </div>
        
        <div className="room-container">
          <RoomList />
        </div>
      </section>

      <div className="ticks"></div>
      
      <section id="next-steps" style={{textAlign: 'center', padding: '20px'}}>
         <p>נמשך בהצלחה מ-MongoDB Atlas</p>
      </section>
    </>
  )
}

export default App