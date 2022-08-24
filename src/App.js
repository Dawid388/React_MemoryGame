import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';


const cardImages = [
  { "src": "/img/mars.png", matched: false },
  { "src": "/img/earth.png",  matched: false },
  { "src": "/img/saturn.png",  matched: false },
  { "src": "/img/jupiter.png", matched: false  },
  { "src": "/img/neptun.png", matched: false  },
  { "src": "/img/pluto.png", matched: false  },
]



function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setchoiceOne] = useState(null)
  const [choiceTwo, setchoiceTwo] = useState(null)
  const [disable, setdisable] = useState(false)

  const handleChoice = (card) => {
    choiceOne ? setchoiceTwo(card) : setchoiceOne(card)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setdisable(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src){
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurns()
      } else {
    
      setTimeout(resetTurns, 700)
      }
    }
  },[choiceOne,choiceTwo])



  const resetTurns = () => {
    setdisable(false)
    setchoiceOne(null)
    setchoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
  }


  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
      setchoiceOne(null)
      setchoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
  }
 
  useEffect(() => (
    shuffleCards()
  ),[])

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard  
          key={card.id}  
          card={card} 
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disable={disable} />
        ))}
      </div>  
      <p>Turn:{turns}</p>
      <button onClick = {shuffleCards}>reset</button>
    </div>
  );
}

export default App;
