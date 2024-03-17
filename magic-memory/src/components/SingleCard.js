import './SingleCard.css'
import { useState , useRef} from 'react'

export default function SingleCard({ card, setConfettiTriggered, handleCardClick, number, uniqueNumber }) {
    const [flipped, setFlipped] = useState(false);
    const [shown, setShown] = useState(false);
    const [flipCount, setFlipCount] = useState(0);
    const [clickable, setClickable] = useState(true);
    const [zoomed, setZoomed] = useState(false);
    const audioRef = useRef(null);

    const handleClick = () => {
        
        if (clickable) {
            if (!flipped && flipCount < 2) {
                setFlipped(true);
                setShown(true);
                setFlipCount(flipCount + 1);
                setZoomed(true);
                setConfettiTriggered(true);
                if (audioRef.current) {
                    audioRef.current.play();
                }
            } else if (flipCount >= 1 && !shown) {
                setClickable(false);
                handleCardClick();     
            } else {
                setShown(!shown);
                setZoomed(!zoomed);
                handleCardClick();
                if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0; 
                }   
            }
        }
        
    };
    return (
        <div className={`card ${flipped ? 'flipped' : ''} ${zoomed ? 'zoomed' : ''}`} onClick={handleClick}>
            <div className="flipper">
                <div className="front">
                    <div className={`front ${!shown ? 'hidden' : ''}`}>
                    <img className='front' src={card.src} alt='card front'></img>
                    <audio ref={audioRef} src="../img/cheer_fade.mp4"/>
                    <div className='uniqueNumber'>{uniqueNumber}</div>
                    {/* {confettiTriggered && <Confetti />} */}
                    </div>
                </div>
                <div className="back">
                    <img className='back' src="../img/Domain-1-xxx.png" alt='card back'></img>
                    <div className="text-overlay">
                        <div className='number'>{number}</div>
                    </div>
                </div>
            </div>
        </div>
    )

}