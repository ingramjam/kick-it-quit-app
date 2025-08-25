import React from 'react';

function BreathingActivity({ onBack }) {
    return (
        <div className="activity-view">
            <header className="app-header"><h1>Deep Breathing</h1></header>
            <button className="back-button" onClick={onBack}>← Back</button>
            <div className="activity-header">
                <p>Calm your mind and release tension.</p>
            </div>
            <div className="breathing-container">
                <div className="breathing-circle"></div>
            </div>
        </div>
    );
}

export default BreathingActivity;