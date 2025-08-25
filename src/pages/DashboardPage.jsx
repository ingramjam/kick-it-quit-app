import React, { useState, useEffect } from 'react';

function MetricCard({ value, label }) { return ( <div className="metric-card"> <h3>{value}</h3> <p>{label}</p> </div> ); }

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

export default DashboardPage;