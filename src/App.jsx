import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card'
import ScoreBoard from './components/ScoreBoard';

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [pokemonData, setPokemonData] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [win, setWin] = useState(false);

  const pokemons = ["taillow", "hoothoot", "pidgey", "starly", "pikipek"];

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const results = [];
        
        for(let i= 0; i < pokemons.length; i++){
        const response = await fetch(' https://pokeapi.co/api/v2/pokemon/' + pokemons[i]);
        const data = await response.json();

        const pokemonObj = {
          id: data.id,
          name: data.name,
          image: data.sprites.front_default
        };

        results.push(pokemonObj);

        }
        setPokemonData(results);

      } catch (error) {
        console.error("Error found:", error);
      }
    };
    fetchPokemons();
  }, []);

  const shuffleCards = () => {
    const shuffled = [...pokemonData].sort(() => Math.random() - 0.5);
    setPokemonData(shuffled);
  }

  const handleCardClick = (id) => {
    if (clickedCards.includes(id)) {
      setCurrentScore(0);
      setClickedCards([]);
  } else {
    const newScore = currentScore + 1;
    setCurrentScore(newScore);
    
    // spread so it doesn't change the original)
    setClickedCards([...clickedCards, id]);

    if (newScore > bestScore) {
      setBestScore(newScore);
      if (newScore === pokemons.length)
        setWin(true);
    }
  }

  shuffleCards();
  }



  return (
    <div>
      <div>
        <h1>Memory Game</h1>
        <p>Click a card but only once, can you click all of them without repeating?</p>
      </div>
      <ScoreBoard 
        currentScore ={currentScore}
        bestScore={bestScore}
        win={win}
         />
      <div className='card-grid' style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
    {pokemonData.map((pokemon) => (
    <Card 
      key={pokemon.id} 
      id={pokemon.id}
      name={pokemon.name} 
      image={pokemon.image}
      handleOnClick={handleCardClick}
    />
  ))}
  </div>
</div>
  )
}

export default App
