import React, { useState } from 'react';

function StopTechniqueActivity({ onBack }) {
    const [stepIndex, setStepIndex] = useState(0);
    const steps = [
        { title: "1. Stop", text: "Freeze for a moment. Don't do anything else. Just pause." },
        { title: "2. Take a step back", text: "Take a break from the situation. A deep breath can help." },
        { title: "3. Observe", text: "Notice what you're feeling and thinking without judgment." },
        { title: "4. Proceed Mindfully", text: "Make a choice that aligns with your goal to quit. You can do this." }
    ];

    const handleNext = () => {
        setStepIndex(prev => prev + 1);
    };

    if (stepIndex >= steps.length) {
        return (
            <div className="activity-view">
                <header className="app-header"><h1>The STOP Technique</h1></header>
                <div className="activity-header">
                    <h1>Great job!</h1>
                    <p>You successfully used the STOP technique to handle the moment.</p>
                </div>
                <button className="primary-button" onClick={onBack}>Done</button>
            </div>
        );
    }

    return (
        <div className="activity-view">
            <header className="app-header"><h1>The STOP Technique</h1></header>
            <button className="back-button" onClick={onBack}>← Back</button>
            
            <div className="stop-modal-content" style={{background: 'var(--surface-color)', borderRadius: '1rem', padding: '2rem', textAlign: 'center'}}>
                <h2>{steps[stepIndex].title}</h2>
                <p style={{color: 'var(--subtle-text-color)', marginTop: '0.5rem'}}>{steps[stepIndex].text}</p>
                <button className="primary-button" style={{marginTop: '1.5rem', width: '100%'}} onClick={handleNext}>Next</button>
            </div>
        </div>
    );
}

export default StopTechniqueActivity;