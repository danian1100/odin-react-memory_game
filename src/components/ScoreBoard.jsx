export default function ScoreBoard({ currentScore, bestScore, win }) {
    return (
        <div className="scoreboard" 
            style={{backgroundColor:'darkred', padding: '10px', 
                border: '2px solid', width: '200px', margin: '50px auto' 
            }}>
            <div className="currentscore">Current Score: {currentScore}</div>
            <div className="bestcore">Best Score: {bestScore}</div>
            {win && <p>You Win!!</p>}
        </div>
    )
}