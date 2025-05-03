import React, { useState, useEffect } from 'react';
import '../../css/tooltip.css'; 
import '../../css/global.css'; 

const Tooltip = ({ text, targetRef, tooltipRef }) => {
    const [position, setPosition] = useState('top'); // Default to top

    // Dynamically calculate the position based on target element's position
    useEffect(() => {
        const calculatePosition = () => {
            // Ensure both targetRef and tooltipRef are defined
            if (!targetRef?.current || !tooltipRef?.current) return;

            const targetRect = targetRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Log positions for debugging
            console.log('Target Element:', targetRect);
            console.log('Tooltip Element:', tooltipRect);

            // Position the tooltip based on available space
            if (targetRect.left + tooltipRect.width > viewportWidth) {
                setPosition('left');
            } else if (targetRect.top - tooltipRect.height < 0) {
                setPosition('bottom');
            } else if (targetRect.bottom + tooltipRect.height > viewportHeight) {
                setPosition('top');
            } else {
                setPosition('top');
            }
        };

        // Recalculate tooltip position when resizing the window
        window.addEventListener('resize', calculatePosition);
        calculatePosition(); // Initial calculation on component mount

        // Cleanup the event listener
        return () => window.removeEventListener('resize', calculatePosition);
    }, [targetRef, tooltipRef]); // Re-run only if refs change

    return (
        <div
            className={`tooltip-container ${position} ${text ? 'show-tooltip' : ''}`} // Only show the tooltip if text is available
            ref={tooltipRef}
            style={{
                visibility: text ? 'visible' : 'hidden', // Make tooltip visible only when text is available
                opacity: text ? 1 : 0, // Tooltip fades in when it has content
            }}
        >
            <div className="tooltip">
                {text}
            </div>
        </div>
    );
};

export default Tooltip;
