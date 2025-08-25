import React, { useState, useEffect, useRef } from 'react';

function MindsetPage() {
    // ... logic remains the same
    const content = [ { urge: "I NEED TO SMOKE!", affirmation: "THIS FEELING WILL PASS!" }, { urge: "JUST ONE WON'T HURT.", affirmation: "I'M PROUD OF STAYING QUIT." }, { urge: "QUITTING IS TOO HARD.", affirmation: "I'VE ALREADY COME SO FAR." }, ]; const [currentIndex, setCurrentIndex] = useState(0); const [isDragging, setIsDragging] = useState(false); const containerRef = useRef(null); const sliderRef = useRef(null); const positiveSideRef = useRef(null); const positiveTextRef = useRef(null); const negativeTextRef = useRef(null); const setSliderPosition = (percent) => { percent = Math.max(0, Math.min(100, percent)); if (sliderRef.current) { sliderRef.current.style.left = `${percent}%`; const clipPath = `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0 100%)`; positiveSideRef.current.style.clipPath = clipPath; positiveTextRef.current.style.clipPath = clipPath; } }; const moveSlider = (clientX) => { if (!containerRef.current) return; const rect = containerRef.current.getBoundingClientRect(); const percent = ((clientX - rect.left) / rect.width) * 100; setSliderPosition(percent); }; const handleMouseMove = (e) => { if (isDragging) moveSlider(e.clientX); }; const handleTouchMove = (e) => { if (isDragging) moveSlider(e.touches[0].clientX); }; const handleMouseUp = () => setIsDragging(false); const handleTouchEnd = () => setIsDragging(false); useEffect(() => { document.addEventListener('mousemove', handleMouseMove); document.addEventListener('mouseup', handleMouseUp); document.addEventListener('touchmove', handleTouchMove); document.addEventListener('touchend', handleTouchEnd); return () => { document.removeEventListener('mousemove', handleMouseMove); document.removeEventListener('mouseup', handleMouseUp); document.removeEventListener('touchmove', handleTouchMove); document.removeEventListener('touchend', handleTouchEnd); }; }, [isDragging]); const showNext = () => { setCurrentIndex(i => (i + 1) % content.length); setSliderPosition(0); }; const showPrev = () => { setCurrentIndex(i => (i - 1 + content.length) % content.length); setSliderPosition(0); }; const { urge, affirmation } = content[currentIndex];

    return (
        <div className="activity-view mindset-container">
            <header className="app-header"><h1>Mindset Flip</h1></header>
            <div className="activity-header">
                <h1>Change Your Thinking</h1>
                <p>Swipe the handle to reveal a new mindset.</p>
            </div>
            <div className="mindset-nav-buttons">
                <button onClick={showPrev}>Previous</button>
                <span>{currentIndex + 1} / {content.length}</span>
                <button onClick={showNext}>Next</button>
            </div>
            <div className="swipe-container" ref={containerRef}>
                <div className="swipe-image-container">
                    <img src="https://static.wixstatic.com/media/43bd37_7a86a3cc63fe412d904be62db3b7b650~mv2.jpg" className="swipe-image" alt="Negative thought"/>
                    <div className="message-text" id="negative-text" ref={negativeTextRef}>{urge}</div>
                </div>
                <div className="swipe-image-container" id="positive-side" ref={positiveSideRef}>
                    <img src="https://static.wixstatic.com/media/43bd37_94fc0b8331274dea8da06bb31a283444~mv2.jpg" className="swipe-image" alt="Positive thought"/>
                </div>
                <div className="message-text" id="positive-text" ref={positiveTextRef}>{affirmation}</div>
                <div id="slider" ref={sliderRef} onMouseDown={()=>setIsDragging(true)} onTouchStart={()=>setIsDragging(true)}>
                    <div id="slider-handle">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7 7-7m4 14l7-7-7-7" /></svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MindsetPage;