import './Singlecard.css'

export default function SingleCard({ card, handleChoice, flipped, disable }) {

  const handleClick = () => {
    if(!disable){
      handleChoice(card)
    }
  }


  return (
    <div className="card">
    <div className={flipped ? "flipped" : ""}>
      <img className="front" src={card.src} alt="card front"/>
      <img className="back " src="/img/cover.png" onClick={handleClick} alt="back"/>
    </div>
  </div> 
  )
}
