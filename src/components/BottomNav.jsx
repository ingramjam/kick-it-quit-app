import React from 'react';
import { FiHome, FiZap, FiSmile, FiMessageSquare, FiUser, FiHelpCircle } from 'react-icons/fi';

function BottomNav({ currentPage, setCurrentPage }) {
    const navItems = [
        { page: 'home', icon: <FiHome />, label: 'Home' },
        { page: 'tools', icon: <FiZap />, label: 'Tools' },
        { page: 'mindset', icon: <FiSmile />, label: 'Mindset' },
        { page: 'support', icon: <FiMessageSquare />, label: 'Support' },
        { page: 'quizzes', icon: <FiHelpCircle />, label: 'Quizzes'},
        { page: 'profile', icon: <FiUser />, label: 'Profile' }
    ];

    return (
        <nav className="bottom-nav">
            {navItems.map(item => (
                <button
                    key={item.page}
                    className={`nav-button ${currentPage === item.page ? 'active' : ''}`}
                    onClick={() => setCurrentPage(item.page)}
                >
                    {item.icon}
                    <span className="nav-label">{item.label}</span>
                </button>
            ))}
        </nav>
    );
}

export default BottomNav;