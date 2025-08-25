import React, { useState } from 'react';
import './CravingActivities.css'; // This CSS file needs to exist

function CravingActivitiesPage() {
    const [activeTab, setActiveTab] = useState('4ds');
    const [currentThought, setCurrentThought] = useState(0);
    const [showAffirmation, setShowAffirmation] = useState(false);
    const [stopModalIndex, setStopModalIndex] = useState(-1);

    const thoughts = [
        { urge: "I'll just have one, it won't hurt.", affirmation: "One will lead back to my old habits. I'm proud of my progress." },
        { urge: "I need it to relax.", affirmation: "I can find healthier ways to cope with stress." },
        { urge: "Everyone else is doing it.", affirmation: "I'm doing this for my own health and my reasons." },
    ];

    const nextThought = () => {
        setShowAffirmation(false);
        setCurrentThought((prev) => (prev + 1) % thoughts.length);
    };

    const handleShowAffirmation = () => setShowAffirmation(true);
    const handleStartStop = () => setStopModalIndex(0);
    const handleNextStop = () => setStopModalIndex(i => i + 1);
    const handleFinishStop = () => setStopModalIndex(-1);

    return (
        <div className="coping-dashboard">
            <header className="coping-header">
                <h1>Coping Strategies Dashboard</h1>
                <p>Your toolkit for staying on track.</p>
            </header>

            <main className="coping-grid">
                <Quadrant1 activeTab={activeTab} setActiveTab={setActiveTab} />
                <Quadrant2 
                    thought={thoughts[currentThought]} 
                    showAffirmation={showAffirmation}
                    onShowAffirmation={handleShowAffirmation}
                    onNextThought={nextThought} 
                />
                <Quadrant3 onStart={handleStartStop} />
                <Quadrant4 />
            </main>

            {stopModalIndex !== -1 && (
                <StopModals 
                    activeIndex={stopModalIndex}
                    onNext={handleNextStop}
                    onFinish={handleFinishStop}
                />
            )}
        </div>
    );
}

const Quadrant1 = ({ activeTab, setActiveTab }) => {
    const data4Ds = [{ title: 'Delay', content: 'Wait it out. Cravings only last a few minutes.', color: 'bg-blue-500' }];
    return (
        <div className="quadrant">
             <div className="quadrant-header">
                <h2>Quick Techniques</h2>
                <div className="toggle-buttons">
                    <button onClick={() => setActiveTab('4ds')} className={activeTab === '4ds' ? 'active' : ''}>4Ds</button>
                    <button onClick={() => setActiveTab('3rs')} className={activeTab === '3rs' ? 'active' : ''}>3Rs</button>
                </div>
            </div>
            <div className="card-container">
                <div className={`activity-card ${data4Ds[0].color}`}>
                    <h3>{data4Ds[0].title}</h3>
                    <p>{data4Ds[0].content}</p>
                </div>
            </div>
            <p className="quadrant-footer">SWIPE CARDS</p>
        </div>
    );
};

const Quadrant2 = ({ thought, showAffirmation, onShowAffirmation, onNextThought }) => (
    <div className="quadrant">
        <h2 className="text-center">Change Your Thinking</h2>
        <p className="text-center subtitle">Turn a negative thought into a positive one.</p>
        <div className="urge-box">
            <p className="urge-label">Urge Thought:</p>
            <p className="urge-text">"{thought.urge}"</p>
        </div>
        <div className="affirmation-container">
            {showAffirmation && (
                <div className="affirmation-box popIn">
                     <p className="affirmation-label">Positive Mindset:</p>
                     <p className="affirmation-text">"{thought.affirmation}"</p>
                </div>
            )}
        </div>
        <div className="quadrant-actions">
            <button className="primary-button-quadrant" onClick={onShowAffirmation}>Show me a positive mindset</button>
            <button className="secondary-button-quadrant" onClick={onNextThought}>Next Thought</button>
        </div>
    </div>
);

const Quadrant3 = ({ onStart }) => (
    <div className="quadrant">
        <h2 className="text-center">The STOP Technique</h2>
        <p className="text-center subtitle">Pause and handle urges mindfully.</p>
        <div className="quadrant-content-centered">
            <p>When you feel an urge, press the button below to begin.</p>
        </div>
        <button onClick={onStart} className="primary-button-quadrant red">Start Exercise</button>
    </div>
);

const Quadrant4 = () => (
    <div className="quadrant">
         <h2 className="text-center">Deep Breathing</h2>
         <p className="text-center subtitle">Calm your mind and release tension.</p>
         <div className="quadrant-content-centered">
            <div className="breathing-circle"></div>
            <p className="breathing-text-anim">Breathe...</p>
         </div>
    </div>
);

const StopModals = ({ activeIndex, onNext, onFinish }) => {
    const modals = [
        { title: "1. Stop", text: "Freeze for a moment. Don't do anything else." },
        { title: "2. Take a step back", text: "Take a break from the situation." },
        { title: "3. Observe", text: "Notice what you're feeling without judgment." },
        { title: "4. Proceed Mindfully", text: "Make a choice that aligns with your goals." },
    ];
    if (activeIndex >= modals.length) return null;
    const currentModal = modals[activeIndex];
    return (
        <div className="stop-modal active">
            <div className="stop-modal-content">
                <h2>{currentModal.title}</h2>
                <p>{currentModal.text}</p>
                {activeIndex < modals.length - 1 ? (
                    <button onClick={onNext} className="primary-button-quadrant">Next</button>
                ) : (
                    <button onClick={onFinish} className="primary-button-quadrant">Finish</button>
                )}
            </div>
        </div>
    );
};

export default CravingActivitiesPage;