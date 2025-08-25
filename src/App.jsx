import React, { useState, useEffect } from 'react';
import BottomNav from './components/BottomNav';
import DashboardPage from './pages/DashboardPage';
import ToolsPage from './pages/ToolsPage';
import MindsetPage from './pages/MindsetPage';
import SupportPage from './pages/SupportPage';
import ProfilePage from './pages/ProfilePage';
import QuizzesPage from './pages/QuizzesPage';

function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [userData, setUserData] = useState(() => {
        const savedData = localStorage.getItem('userData');
        return savedData ? JSON.parse(savedData) : { quitDate: null, dailyCost: 0 };
    });

    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(userData));
    }, [userData]);
    
    const handleResetData = () => {
        if (window.confirm("Are you sure? This will clear your quit date and stats.")) {
            localStorage.removeItem('userData');
            setUserData({ quitDate: null, dailyCost: 0 });
            setCurrentPage('home');
        }
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <DashboardPage userData={userData} setUserData={setUserData} />;
            case 'tools':
                return <ToolsPage />;
            case 'mindset':
                return <MindsetPage />;
            case 'support':
                return <SupportPage />;
            case 'quizzes':
                return <QuizzesPage />;
            case 'profile':
                return <ProfilePage onReset={handleResetData} />;
            default:
                return <DashboardPage userData={userData} setUserData={setUserData} />;
        }
    };

    return (
        <div className="app-container">
            {renderPage()}
            <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
}

export default App;