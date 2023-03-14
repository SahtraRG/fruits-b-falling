const ScoreBoard = ({score, winCondition}) => {
  const {color, pairs, moves} = winCondition

  return(
      <div className="score-board">
          <h2>Goal: {pairs} Pairs Of {color} </h2>
          <h3>Moves Left: {moves}</h3>
          <h3>Current Score: {score}</h3>
      </div>
  )

}

export default ScoreBoard

