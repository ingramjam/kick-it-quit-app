import React, { useState } from 'react';

function SwipeCardsActivity({ onBack }) {
    const initialCards = [
        { title: 'Delay', content: 'Wait it out. Cravings only last a few minutes.', color: 'bg-blue-500' },
        { title: 'Distraction', content: 'Do something else! Watch a video or call a friend.', color: 'bg-green-500' },
        { title: 'Deep Breathing', content: 'Inhale for 4s, hold for 4s, and exhale for 6s.', color: 'bg-indigo-500' },
        { title: 'Drink Water', content: 'Sip cold water slowly to satisfy oral cravings.', color: 'bg-sky-500' }
    ];
    const [cardStack, setCardStack] = useState(initialCards);

    const handleSwipe = (card) => {
        setTimeout(() => {
            setCardStack(prev => [card, ...prev.slice(0, prev.length - 1)]);
        }, 300);
    };

    return (
        <div className="activity-view">
            <header className="app-header"><h1>The 4Ds</h1></header>
            <button className="back-button" onClick={onBack}>← Back</button>
            <div className="activity-header">
                <p>Swipe the cards away to practice each technique.</p>
            </div>
            <div className="swipe-cards-container">
                {cardStack.map((card, index) => {
                    const isTop = index === cardStack.length - 1;
                    return (
                        <div key={card.title + index} className={`swipe-card ${card.color}`}
                             style={{ zIndex: index, transform: isTop ? 'none' : `translateY(${(cardStack.length - 1 - index) * 8}px) scale(${1 - (cardStack.length - 1 - index) * 0.05})` }}
                             onClick={() => isTop && handleSwipe(card)}>
                            <h3>{card.title}</h3>
                            <p>{card.content}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SwipeCardsActivity;