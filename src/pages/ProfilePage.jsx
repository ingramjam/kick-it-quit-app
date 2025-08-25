import React from 'react';

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

export default ProfilePage;