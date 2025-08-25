import React, { useState } from 'react';
import BreathingActivity from '../activities/BreathingActivity';
import SwipeCardsActivity from '../activities/SwipeCardsActivity';
import StopTechniqueActivity from '../activities/StopTechniqueActivity';
import CuditQuizActivity from '../activities/CuditQuizActivity';

function ToolsPage() {
    const [activeActivity, setActiveActivity] = useState(null);

    const renderActivity = () => {
        switch (activeActivity) {
            case 'breathing':
                return <BreathingActivity onBack={() => setActiveActivity(null)} />;
            case '4ds':
                return <SwipeCardsActivity onBack={() => setActiveActivity(null)} />;
            case 'stop':
                return <StopTechniqueActivity onBack={() => setActiveActivity(null)} />;
            case 'quiz':
                return <CuditQuizActivity onBack={() => setActiveActivity(null)} />;
            default:
                return (
                    <div>
                        <header className="app-header"><h1>Craving Tools</h1></header>
                        <div className="craving-menu">
                            <button className="activity-button" onClick={() => setActiveActivity('breathing')}>Deep Breathing</button>
                            <button className="activity-button" onClick={() => setActiveActivity('4ds')}>The 4Ds (Swipe Cards)</button>
                            <button className="activity-button" onClick={() => setActiveActivity('stop')}>The STOP Technique</button>
                            <button className="activity-button" onClick={() => setActiveActivity('quiz')}>Cannabis Use Quiz (CUDIT-R)</button>
                        </div>
                    </div>
                );
        }
    };

    return <div>{renderActivity()}</div>;
}

export default ToolsPage;