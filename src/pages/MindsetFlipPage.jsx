import React, { useState, useRef, useEffect } from 'react';

const content = [
    { urge: "I NEED TO SMOKE!", affirmation: "THIS FEELING WILL PASS!" },
    { urge: "JUST ONE WON'T HURT.", affirmation: "I'M PROUD OF STAYING QUIT." },
    { urge: "EVERYONE ELSE IS.", affirmation: "I'M DOING THIS FOR MY HEALTH." },
    { urge: "I CAN'T HANDLE THIS.", affirmation: "I AM STRONG ENOUGH." },
    { urge: "I MISS VAPING WITH FRIENDS.", affirmation: "I CAN ENJOY FRIENDS WITHOUT VAPING." },
    { urge: "QUITTING IS TOO HARD.", affirmation: "I'VE ALREADY COME SO FAR." },
    { urge: "THE CRAVINGS ARE TOO STRONG.", affirmation: "CRAVINGS ARE TEMPORARY." },
    { urge: "I'LL QUIT TOMORROW.", affirmation: "MY HEALTH IS WORTH IT TODAY." },
];

function MindsetFlipPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    
    const containerRef = useRef(null);
    const sliderRef = useRef(null);
    const positiveSideRef = useRef(null);
    const positiveTextRef = useRef(null);
    const negativeTextRef = useRef(null);

    const setSliderPosition = (percent) => {
        percent = Math.max(0, Math.min(100, percent));
        if (sliderRef.current && positiveSideRef.current && positiveTextRef.current && negativeTextRef.current) {
            sliderRef.current.style.left = `${percent}%`;
            const clipPath = `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0 100%)`;
            positiveSideRef.current.style.clipPath = clipPath;
            positiveTextRef.current.style.clipPath = clipPath;
            negativeTextRef.current.style.opacity = Math.max(0, 1 - (percent / 50));
        }
    };
    
    const moveSlider = (clientX) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const percent = ((clientX - rect.left) / rect.width) * 100;
        setSliderPosition(percent);
    };

    const handleMouseDown = (e) => setIsDragging(true);
    const handleMouseUp = (e) => setIsDragging(false);

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        moveSlider(e.clientX);
    };

    const handleTouchStart = (e) => setIsDragging(true);
    const handleTouchEnd = (e) => setIsDragging(false);

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        moveSlider(e.touches[0].clientX);
    };

    // Add and remove global event listeners for smooth dragging
    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isDragging]);

    const showNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % content.length);
        setSliderPosition(0);
    };

    const showPrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + content.length) % content.length);
        setSliderPosition(0);
    };
    
    const { urge, affirmation } = content[currentIndex];

    return (
        <div className="mindset-container">
            <div className="mindset-header">
                <h1>Change Your Thinking</h1>
                <p>Urges can feel loud. Learn to talk back. Swipe the green handle to reveal a new mindset.</p>
            </div>

            <div className="mindset-nav-buttons">
                <button onClick={showPrev}>Previous</button>
                <span>{currentIndex + 1} / {content.length}</span>
                <button onClick={showNext}>Next</button>
            </div>

            <div id="swipe-container" className="swipe-container" ref={containerRef}>
                <div id="negative-side" className="swipe-image-container">
                    <img src="https://static.wixstatic.com/media/43bd37_7a86a3cc63fe412d904be62db3b7b650~mv2.jpg" className="swipe-image" alt="Negative thought visualization" />
                    <div id="negative-text" className="message-text" ref={negativeTextRef}>{urge}</div>
                </div>
                
                <div id="positive-side" className="swipe-image-container" ref={positiveSideRef}>
                    <img src="https://static.wixstatic.com/media/43bd37_94fc0b8331274dea8da06bb31a283444~mv2.jpg" className="swipe-image" alt="Positive thought visualization" />
                </div>
                <div id="positive-text" className="message-text" ref={positiveTextRef}>{affirmation}</div>

                <div id="slider" ref={sliderRef} onMouseDown={handleMouseDown} onTouchStart={handleTouchStart}>
                    <div id="slider-handle">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7 7-7m4 14l7-7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MindsetFlipPage;