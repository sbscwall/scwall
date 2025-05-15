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
    
            // Log values for debugging
            console.log('Target Rect:', targetRect);
            console.log('Tooltip Rect:', tooltipRect);
            console.log('Viewport:', { viewportWidth, viewportHeight });
    
            // Calculate available space to the right of the target
            const spaceToRight = viewportWidth - targetRect.right;
            const spaceToLeft = targetRect.left;
    
            // If the tooltip doesn't fit to the right, position it to the left if there’s enough space
            if (spaceToRight <= tooltipRect.width) {
                setPosition('left');
            } else if (spaceToLeft <= tooltipRect.width) {
                setPosition('right');
            } else if (targetRect.top - tooltipRect.height > 0) {
                setPosition('top');
            } else if (targetRect.bottom + tooltipRect.height < viewportHeight) {
                setPosition('bottom');
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
                zIndex: 11000, // Ensure it's always above other elements
            }}
        >
            <div className="tooltip">
                {text}
            </div>
        </div>
    );
};

export default Tooltip;
