import React from 'react';
import '../styles/style.css';
import '../styles/AppLauncher.css';



const AppLauncher = () => {
  const tools = [
    { id: 1, title: 'שיבוץ חדש', desc: 'חיפוש חדר פנוי לפי פרמטרים' },
    { id: 2, title: 'ניהול חדרים', desc: 'עדכון נתוני אגפים ומקרנים' },
    { id: 3, title: 'לוח זמנים', desc: 'צפייה במערכת השעות הקבועה' },
    { id: 4, title: 'שיבוצים זמניים', desc: 'ניהול חופשות ושחרור חדרים' },
    { id: 5, title: 'דו"חות', desc: 'ניתוח נתוני שימוש בחדרים' },
    { id: 6, title: 'הגדרות', desc: 'ניהול הרשאות ומשתמשים' },
  ];

  return (
    <div className="launcher-container">
      <header className="launcher-header">
        <h1>מרכז ניהול שיבוצים</h1>
        <p>מערכת חכמה לניהול משאבי הסמינר</p>
      </header>
      
      <div className="launcher-grid-fixed">
        {tools.map((tool) => (
          <button key={tool.id} className="launcher-card-btn">
            <div className="card-indicator"></div>
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