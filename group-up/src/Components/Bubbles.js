import React, { useEffect, useRef } from 'react'

export default function Bubbles({height}) {
    const bubbleRefs = useRef([]);

    const setBubbleStyles = (bubble) => {
        const size = Math.random() * 30 + 30;
        const bubbleX = Math.random() * 100;
        const time = Math.random() * 6 + 4;
        const start = Math.random() * time;

        bubble.style.setProperty('--bubble-size', `${size}px`);
        bubble.style.setProperty('--bubble-left', `${bubbleX}%`);
        bubble.style.setProperty('--bubble-time', `${time}s`);
        bubble.style.setProperty('--bubble-start', `-${start}s`);
    }

    const resetBubble = (bubble) => {
        setBubbleStyles(bubble);
        
        // Reset animation so it restarts cleanly
        bubble.style.animation = 'none';
        void bubble.offsetWidth;
        bubble.style.animation = `float var(--bubble-time) linear infinite`;
        bubble.style.animationPlayState =  `var(--playstate)`;
        bubble.style.bottom = '-10';
    };

    const createBubbleStyles = () => {
        bubbleRefs.current.forEach((bubble) => {
            if (!bubble) return;
            setBubbleStyles(bubble);
            bubble.addEventListener('animationiteration', () => {
                resetBubble(bubble);
            });
        });
    };

    useEffect(() => {
        createBubbleStyles();
        document.documentElement.style.setProperty('--bubble-height', `${height}`);
    }, []);

  return (
    <div id='bubble-container'>
        {[...Array(20)].map((_, i) => (
            <span
            key={i}
            className="bubble"
            ref={(el) => (bubbleRefs.current[i] = el)}
            />
        ))}
    </div>
  )
}
