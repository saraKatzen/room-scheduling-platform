import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import RoomList from './components/RoomList'
import AppLauncher from './components/AppLauncher'
import AddAssignment from './components/AddAssignment' // הדף שלך
import RoomManagement from './components/RoomManagement' // הדף שהן הוסיפו

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          {/* דף הבית */}
          <Route path="/" element={<AppLauncher />} />
          
          {/* הדפים של הצוות */}
          <Route path="/rooms" element={<RoomList />} />
          <Route path="/manage-rooms" element={<RoomManagement />} />
          
          {/* הדף החדש שלך! */}
          <Route path="/add-assignment" element={<AddAssignment />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App