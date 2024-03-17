import { useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'
import Confetti from './components/Confetti';

// Define the distribution of images
const cardFronts = { "/img/1.png": 15, "/img/2.png": 15 };

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [confettiTriggered, setConfettiTriggered] = useState(false);
  const [confettiVisible, setConfettiVisible] = useState(false);
  
  const cardNumbers = Array.from({length: 30}, (_, index) => index+1)

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // shuffle cards for new game
  const shuffleCards = () => {

   let uniqueNumbers1 = Array.from({length: 15}, (_, index) => index+1);
   shuffleArray(uniqueNumbers1);

   let uniqueNumbers2 = Array.from({length: 15}, (_, index) => index+1);
   shuffleArray(uniqueNumbers2);

    let shuffledCards = [];
    let cardNumber = 1;
    Object.entries(cardFronts).forEach(([src, count]) => {
      for (let i = 0; i < count; i++) {
        let uniqueNumber = src === '/img/1.png' && uniqueNumbers1.length > 0 ? uniqueNumbers1.pop() :
                         src === '/img/2.png' && uniqueNumbers2.length > 0 ? uniqueNumbers2.pop() : null;
        shuffledCards.push({ src, id: Math.random(), number: cardNumber++,  uniqueNumber: uniqueNumber });
      }
    });

    shuffledCards = shuffledCards.sort(() => Math.random() - 0.5);

    // Assign fixed numbers to shuffled cards
    shuffledCards.forEach((card, index) => {
      card.number = cardNumbers[index];
    });

    setCards(shuffledCards);
    setTurns(0);
    setConfettiTriggered(false);
    setConfettiVisible(false);
  };

  const handleCardClick = () => {
    setConfettiVisible(false);
    setConfettiTriggered(false);
  };

  console.log(cards, turns)

  return (
    <div className="App">
      <h1>UMHackathon 2024 Domain Selection</h1>
      <button onClick={shuffleCards}>New Deck</button>
      <div className='card-grid'>
        {cards.map(card => (
         <SingleCard
         key={card.id}
         card={card}
         setConfettiTriggered={setConfettiTriggered}
         setConfettiVisible={setConfettiVisible}
         handleCardClick={handleCardClick}
         number={card.number}
         uniqueNumber={card.uniqueNumber}
       />
        ))}
        {confettiTriggered && !confettiVisible && <Confetti />}
      </div>
    </div>
  );
}

export default App
