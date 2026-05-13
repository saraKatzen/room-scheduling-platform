import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import RoomList from './components/RoomList'
import AppLauncher from './components/AppLauncher'
import AddAssignment from './components/AddAssignment';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          {/* שינוי כאן: ה-AppLauncher מופיע רק בנתיב הראשי */}
          <Route path="/" element={<AppLauncher />} />
          
          {/* שאר הנתיבים יחליפו את ה-AppLauncher כשתעברי אליהם */}
          <Route path="/rooms" element={<RoomList />} />
          <Route path="/add-assignment" element={<AddAssignment />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App