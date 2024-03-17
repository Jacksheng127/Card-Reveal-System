import React, {useState, useEffect, useRef} from "react";
import ReactConfetti from "react-confetti";

const Confetti = () => {
    const [windowDimension, setDimension] = useState({width: window.innerWidth, height: window.innerHeight });

    const detectSize = () => {
        setDimension({ width: window.innerWidth, height: Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) });
    }

    const [scrollPosition, setScrollPosition] = useState(0);
    const containerRef = useRef(null);

    const handleScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        setScrollPosition(scrollTop);
    };

    useEffect(() => {
        window.addEventListener('resize', detectSize);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('resize', detectSize);
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    useEffect(() =>{
        detectSize();
        handleScroll();
    }, []);
    
    const confettiComponents = [];

    // Generate ReactConfetti components for each x-coordinate
    for (let x = 0; x < windowDimension.width; x += 350) {
        confettiComponents.push(
            <ReactConfetti
                key={x}
                width={windowDimension.width}
                height={windowDimension.height}
                tweetDuration={1000}
                // numberOfPieces={500}
                confettiSource={{ x: x, y: scrollPosition }}
            />
        );
    }

    return(
        <div className="confetti-container" ref={containerRef}>
            {confettiComponents}
        </div>
    );
};

export default Confetti;