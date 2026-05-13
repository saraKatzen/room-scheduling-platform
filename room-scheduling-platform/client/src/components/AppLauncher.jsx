import React from "react";
import "../styles/style.css";
import "../styles/AppLauncher.css";

const AppLauncher = () => {
  const tools = [
    {
      id: 1,
      title: "שיבוץ חדש",
      desc: "חיפוש חדר פנוי לפי פרמטרים",
      icon: "event",
    },
    {
      id: 2,
      title: "ניהול חדרים",
      desc: "עדכון נתוני אגפים ומקרנים",
      icon: "meeting_room",
    },
    {
      id: 3,
      title: "לוח זמנים",
      desc: "צפייה במערכת השעות הקבועה",
      icon: "calendar_today",
    },
    {
      id: 4,
      title: "שיבוצים זמניים",
      desc: "ניהול חופשות ושחרור חדרים",
      icon: "schedule",
    },
    {
      id: 5,
      title: 'דו"חות',
      desc: "ניתוח נתוני שימוש בחדרים",
      icon: "bar_chart",
    },
    { id: 6, title: "הגדרות", desc: "ניהול הרשאות ומשתמשים", icon: "settings" },
    {
      id: 7,
      title: "ניקוי מערכת",
      desc: "מחיקת כל השיבוצים",
      icon: "delete_forever",
      action: "clear"
    },
  ];
  const handleClearAll = async () => {
    if (window.confirm("למחוק את כל השיבוצים?")) {
      const response = await fetch('http://localhost:3000/api/rooms/clear-all', { method: 'DELETE' });
      if (response.ok) alert("נוקה בהצלחה");
    }
  };
  return (
    <div className="launcher-container">
      <header className="launcher-header">
        <h1>מרכז ניהול שיבוצים</h1>
        <p>מערכת חכמה לניהול משאבי הסמינר</p>
      </header>
      <div className="launcher-search">
        <span className="material-icons">search</span>
        <input type="text" placeholder="חיפוש כלי, שיבוץ, חדר..." />
      </div>
      <div className="launcher-grid-fixed">
        {/* {tools.map((tool) => (
          <button key={tool.id} className="launcher-card-btn">
            <div className="card-icon">
              <span className="material-icons">{tool.icon}</span>
            </div>
            <div className="card-content">
              <h3>{tool.title}</h3>
              <p>{tool.desc}</p>
            </div>
            <button
              key={tool.id}
              className="launcher-card-btn"
              onClick={() => tool.action === "clear" ? handleClearAll() : null}
            ></button>
          </button>


        ))} */}
        {tools.map((tool) => (
          <button
            key={tool.id}
            className="launcher-card-btn"
            onClick={() => tool.action === "clear" ? handleClearAll() : null}
          >
            <div className="card-icon">
              <span className="material-icons">{tool.icon}</span>
            </div>
            <div className="card-content">
              <h3>{tool.title}</h3>
              <p>{tool.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AppLauncher;
