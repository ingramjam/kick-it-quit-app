import React, { useState, useEffect, useRef } from 'react';
import './App.css'; 
import { FiHome, FiZap, FiSmile, FiMessageSquare, FiUser } from 'react-icons/fi';

// Main App Component
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

    return (
        <div className="app-container">
            <main>
                {currentPage === 'home' && <DashboardPage userData={userData} setUserData={setUserData} />}
                {currentPage === 'tools' && <ToolsPage />}
                {currentPage === 'mindset' && <MindsetPage />}
                {currentPage === 'support' && <SupportPage />}
                {currentPage === 'profile' && <ProfilePage onReset={handleResetData} />}
            </main>
            <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
}

// --- Reusable Components ---

function BottomNav({ currentPage, setCurrentPage }) {
    const navItems = [
        { page: 'home', icon: <FiHome />, label: 'Home' },
        { page: 'tools', icon: <FiZap />, label: 'Tools' },
        { page: 'mindset', icon: <FiSmile />, label: 'Mindset' },
        { page: 'support', icon: <FiMessageSquare />, label: 'Support' },
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

function MetricCard({ value, label }) { return ( <div className="metric-card"> <h3>{value}</h3> <p>{label}</p> </div> ); }

// --- Page Components ---

function DashboardPage({ userData, setUserData }) {
    const [smokeFreeHours, setSmokeFreeHours] = useState(0);

    useEffect(() => {
        if (userData.quitDate) {
            const quitDateObj = new Date(userData.quitDate);
            const timer = setInterval(() => {
                const now = new Date();
                const diff = now.getTime() - quitDateObj.getTime();
                setSmokeFreeHours(diff > 0 ? diff / (1000 * 60 * 60) : 0);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [userData.quitDate]);

    if (!userData.quitDate) {
        return <QuitIntakeForm setUserData={setUserData} />;
    }
    
    const days = Math.floor(smokeFreeHours / 24);
    const moneySaved = (smokeFreeHours / 24 * (userData.dailyCost || 0)).toFixed(2);

    return (
        <div>
            <div className="dashboard-header">
                <p>You've been quit for</p>
                <h2>{days} Days</h2>
            </div>
            <div className="progress-metrics">
                <MetricCard value={`$${moneySaved}`} label="Money Saved" />
                <MetricCard value={days} label="Current Streak" />
            </div>
        </div>
    );
}

function QuitIntakeForm({ setUserData }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const quitDate = e.target.elements.quitDate.value;
        const dailyCount = parseFloat(e.target.elements.dailyCount.value);
        const packCost = parseFloat(e.target.elements.packCost.value);
        const itemsPerPack = parseFloat(e.target.elements.itemsPerPack.value);
        const costPerItem = packCost / itemsPerPack;
        const dailyCost = dailyCount * costPerItem;
        setUserData({ quitDate, dailyCost });
    };

    return (
        <div className="intake-container">
            <h1>Let's Get Started</h1>
            <p>Tell us about your habits to personalize your journey.</p>
            <form className="intake-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="quitDate">When is your Quit Date?</label>
                    <input type="date" id="quitDate" name="quitDate" required />
                </div>
                <div className="form-group">
                    <label>How many cigarettes/vapes per day?</label>
                    <input type="number" name="dailyCount" placeholder="e.g., 15" required />
                </div>
                <div className="form-group">
                    <label>Cost per pack/pod?</label>
                    <input type="number" step="0.01" name="packCost" placeholder="e.g., 8.50" required />
                </div>
                <div className="form-group">
                    <label>Items per pack/pod? (e.g., 20 cigs)</label>
                    <input type="number" name="itemsPerPack" placeholder="e.g., 20" required />
                </div>
                <button type="submit" className="primary-button">Start My Journey</button>
            </form>
        </div>
    );
}

function ToolsPage() {
    // This is the menu for all our interactive tools
    const [activeActivity, setActiveActivity] = useState(null);

    // Render the correct activity based on the state
    if (activeActivity === 'breathing') return <BreathingActivity onBack={() => setActiveActivity(null)} />;
    if (activeActivity === '4ds') return <SwipeCardsActivity onBack={() => setActiveActivity(null)} />;
    if (activeActivity === 'stop') return <StopTechniqueActivity onBack={() => setActiveActivity(null)} />;
    
    // Default view: the menu
    return (
        <div>
            <header className="app-header"><h1>Craving Tools</h1></header>
            <div className="craving-menu">
                <button className="activity-button" onClick={() => setActiveActivity('breathing')}>Deep Breathing</button>
                <button className="activity-button" onClick={() => setActiveActivity('4ds')}>The 4Ds (Swipe Cards)</button>
                <button className="activity-button" onClick={() => setActiveActivity('stop')}>The STOP Technique</button>
            </div>
        </div>
    );
}

function MindsetPage() { /* ... unchanged ... */ const content = [ { urge: "I NEED TO SMOKE!", affirmation: "THIS FEELING WILL PASS!" }, { urge: "JUST ONE WON'T HURT.", affirmation: "I'M PROUD OF STAYING QUIT." }, { urge: "QUITTING IS TOO HARD.", affirmation: "I'VE ALREADY COME SO FAR." }, ]; const [currentIndex, setCurrentIndex] = useState(0); const [isDragging, setIsDragging] = useState(false); const containerRef = useRef(null); const sliderRef = useRef(null); const positiveSideRef = useRef(null); const positiveTextRef = useRef(null); const negativeTextRef = useRef(null); const setSliderPosition = (percent) => { percent = Math.max(0, Math.min(100, percent)); if (sliderRef.current) { sliderRef.current.style.left = `${percent}%`; const clipPath = `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0 100%)`; positiveSideRef.current.style.clipPath = clipPath; positiveTextRef.current.style.clipPath = clipPath; } }; const moveSlider = (clientX) => { if (!containerRef.current) return; const rect = containerRef.current.getBoundingClientRect(); const percent = ((clientX - rect.left) / rect.width) * 100; setSliderPosition(percent); }; const handleMouseMove = (e) => { if (isDragging) moveSlider(e.clientX); }; const handleTouchMove = (e) => { if (isDragging) moveSlider(e.touches[0].clientX); }; const handleMouseUp = () => setIsDragging(false); const handleTouchEnd = () => setIsDragging(false); useEffect(() => { document.addEventListener('mousemove', handleMouseMove); document.addEventListener('mouseup', handleMouseUp); document.addEventListener('touchmove', handleTouchMove); document.addEventListener('touchend', handleTouchEnd); return () => { document.removeEventListener('mousemove', handleMouseMove); document.removeEventListener('mouseup', handleMouseUp); document.removeEventListener('touchmove', handleTouchMove); document.removeEventListener('touchend', handleTouchEnd); }; }, [isDragging]); const showNext = () => { setCurrentIndex(i => (i + 1) % content.length); setSliderPosition(0); }; const showPrev = () => { setCurrentIndex(i => (i - 1 + content.length) % content.length); setSliderPosition(0); }; const { urge, affirmation } = content[currentIndex]; return ( <div className="activity-view mindset-container"> <header className="app-header"><h1>Mindset Flip</h1></header> <div className="activity-header"> <h1>Change Your Thinking</h1> <p>Swipe the handle to reveal a new mindset.</p> </div> <div className="mindset-nav-buttons"> <button onClick={showPrev}>Previous</button> <span>{currentIndex + 1} / {content.length}</span> <button onClick={showNext}>Next</button> </div> <div className="swipe-container" ref={containerRef}> <div className="swipe-image-container"> <img src="https://static.wixstatic.com/media/43bd37_7a86a3cc63fe412d904be62db3b7b650~mv2.jpg" className="swipe-image" alt="Negative thought"/> <div className="message-text" id="negative-text" ref={negativeTextRef}>{urge}</div> </div> <div className="swipe-image-container" id="positive-side" ref={positiveSideRef}> <img src="https://static.wixstatic.com/media/43bd37_94fc0b8331274dea8da06bb31a283444~mv2.jpg" className="swipe-image" alt="Positive thought"/> </div> <div className="message-text" id="positive-text" ref={positiveTextRef}>{affirmation}</div> <div id="slider" ref={sliderRef} onMouseDown={()=>setIsDragging(true)} onTouchStart={()=>setIsDragging(true)}> <div id="slider-handle"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7 7-7m4 14l7-7-7-7" /></svg> </div> </div> </div> </div> ); }

function SupportPage() {
    const [log, setLog] = useState([]);
    const [options, setOptions] = useState([]);
    const hasInitialized = useRef(false);
    const chatLogRef = useRef(null);

    const addMessage = (text, sender, newOptions = []) => {
        setLog(prev => [...prev.filter(m => m.sender !== 'loading'), { text, sender }]);
        setOptions(newOptions);
    };

    const handleOptionClick = (option) => {
        addMessage(option.text, 'user');
        setOptions([]);
        setLog(prev => [...prev, { text: '...', sender: 'bot' }]);
        setTimeout(() => option.action(), 600);
    };

    const showSupportInfo = () => {
        addMessage("Great choice! Kick It California offers free services. Coaches can create a personalized plan and help you see if you qualify for free nicotine patches. How would you like to connect?", 'bot', [
            { text: "Visit KickItCA.org", action: () => { window.open("https://www.kickitca.org/", "_blank"); setTimeout(showInitialOptions, 200); } },
            { text: "Call 1-800-QUIT-NOW", action: () => { window.open("tel:18007848669", "_self"); setTimeout(showInitialOptions, 200); } },
            { text: "Go back", action: showInitialOptions }
        ]);
    };
    
    const showInitialOptions = () => {
        addMessage("How can I help you today?", 'bot', [
            { text: "Tell me about support services", action: showSupportInfo },
            { text: "Explore self-help materials", action: showSelfHelpInfo }
        ]);
    };
    
    const showSelfHelpInfo = () => {
        addMessage("Our website has free toolkits and resources you can explore at your own pace.", 'bot', [
             { text: "Take me to the resources", action: () => { window.open('https://kickitca.org/quit-all-kit', '_blank'); setTimeout(showInitialOptions, 200); } },
             { text: "Go back", action: showInitialOptions }
        ]);
    };

    const startConversation = () => {
        addMessage("👋 Welcome to the Kick It California Support Bot!", 'bot');
        setTimeout(showInitialOptions, 800);
    };
    
    useEffect(() => {
        if (!hasInitialized.current) {
            startConversation();
            hasInitialized.current = true;
        }
    }, []);
    
    useEffect(() => {
        if(chatLogRef.current) {
            chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
        }
    }, [log]);

    return (
        <div className="chat-container">
            <header className="app-header"><h1>Support Bot</h1></header>
            <div className="chat-log" ref={chatLogRef}>
                {log.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}-message`}>{msg.text}</div>
                ))}
            </div>
            <div className="chat-options">
                {options.map(opt => (
                    <button key={opt.text} onClick={() => handleOptionClick(opt)}>{opt.text}</button>
                ))}
            </div>
        </div>
    );
}

function ProfilePage({ onReset }) {
    return (
        <div>
            <header className="app-header"><h1>Profile & Settings</h1></header>
            <div className="dashboard-header">
                <h2>Settings</h2>
                <p>Manage your application data here.</p>
            </div>
            <button className="secondary-button" onClick={onReset}>
                Reset Quit Data
            </button>
        </div>
    );
}

// --- Individual Activity Components ---

function BreathingActivity({ onBack }) { /* ... unchanged ... */ return ( <div className="activity-view"> <header className="app-header"><h1>Deep Breathing</h1></header> <button className="back-button" onClick={onBack}>← Back</button> <div className="activity-header"> <p>Calm your mind and release tension.</p> </div> <div className="breathing-container"> <div className="breathing-circle"></div> </div> </div> ); }
function SwipeCardsActivity({ onBack }) { /* ... unchanged ... */ const initialCards = [ { title: 'Delay', content: 'Wait it out. Cravings only last a few minutes.', color: 'bg-blue-500' }, { title: 'Distraction', content: 'Do something else! Watch a video or call a friend.', color: 'bg-green-500' }, { title: 'Deep Breathing', content: 'Inhale for 4s, hold for 4s, and exhale for 6s.', color: 'bg-indigo-500' }, { title: 'Drink Water', content: 'Sip cold water slowly to satisfy oral cravings.', color: 'bg-sky-500' } ]; const [cardStack, setCardStack] = useState(initialCards); const handleSwipe = (card) => { setTimeout(() => { setCardStack(prev => [card, ...prev.slice(0, prev.length - 1)]); }, 300); }; return ( <div className="activity-view"> <header className="app-header"><h1>The 4Ds</h1></header> <button className="back-button" onClick={onBack}>← Back</button> <div className="activity-header"> <p>Swipe the cards away to practice each technique.</p> </div> <div className="swipe-cards-container"> {cardStack.map((card, index) => { const isTop = index === cardStack.length - 1; return ( <div key={card.title + index} className={`swipe-card ${card.color}`} style={{ zIndex: index, transform: isTop ? 'none' : `translateY(${(cardStack.length - 1 - index) * 8}px) scale(${1 - (cardStack.length - 1 - index) * 0.05})` }} onClick={() => isTop && handleSwipe(card)}> <h3>{card.title}</h3> <p>{card.content}</p> </div> ); })} </div> </div> ); }
function StopTechniqueActivity({ onBack }) { /* ... unchanged ... */ const [modalIndex, setModalIndex] = useState(0); const modals = [ "1. Stop", "2. Take a step back", "3. Observe", "4. Proceed Mindfully" ]; if (modalIndex >= modals.length) { return ( <div className="activity-view"> <header className="app-header"><h1>The STOP Technique</h1></header> <div className="activity-header"> <h1>Great job!</h1> <p>You successfully used the STOP technique.</p> </div> <button className="primary-button" onClick={onBack}>Done</button> </div> ); } return ( <div className="stop-modal"> <div className="stop-modal-content"> <h2>{modals[modalIndex]}</h2> <button className="primary-button" onClick={() => setModalIndex(i => i + 1)}>Next</button> </div> </div> ); }

export default App;