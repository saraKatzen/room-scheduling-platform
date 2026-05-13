import { BrowserRouter, Routes, Route } from 'react-router-dom' // ייבוא הכלים של הניווט
import './App.css'
import RoomList from './components/RoomList'
import AppLauncher from './components/AppLauncher'
import RoomSchedule from './components/RoomSchedule'

// אם יש לך קומפוננטת Home, ייבאי אותה. 
// אם אין לך עדיין, אפשר ליצור אחת זמנית או להשתמש ב-RoomList כברירת מחדל.
const Home = () => <div style={{ padding: '20px' }}>ברוכות הבאות למערכת שיבוץ חדרים</div>;

import RoomManagement from './components/RoomManagement'

// function App() {
//   return (
//     <BrowserRouter>
//      <AppLauncher /> 
//       <div className="container"> {/* אופציונלי: עטיפה לעיצוב התוכן שמתחת לסרגל */}
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/rooms" element={<RoomList />} />
//           {/* כאן תוכלו להוסיף בעתיד נתיבים כמו /add-room או /schedule */}
//         </Routes>
//       </div>
//     </BrowserRouter>
//   )
// }
function App() {
  return (
    <BrowserRouter>


          
          
      <div className="container"> {/* אופציונלי: עטיפה לעיצוב התוכן המתחת */}
        <Routes>
          <Route path="/" element={<AppLauncher />} />
          <Route path="/rooms" element={<RoomList />} />
          <Route path="/schedule" element={<RoomSchedule />} />
          {/* כאן תוכלו להוסיף בעתיד נתיבים כמו /add-room או /schedule */}
          <Route path="/manage-rooms" element={<RoomManagement />} />

        </Routes>
      </div>
    </BrowserRouter>
  )
}
export default App