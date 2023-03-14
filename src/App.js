import { useEffect, useState, useCallback } from "react";
import ScoreBoard from "./components/scoreboard";
import blank from "./images/blank.png";
import fruitTiles from "./components/fruitTiles";

const width = 8;



const App = () => {
  
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);
  const [movesCounter, setMovesCounter] = useState(null);
  const [colorCondition, setColorConditions] = useState(null)
  const [movesCondition, setMovesConditions] = useState(null)

  const winCondition = {
    color: colorCondition,
    pairs: movesCondition,
    moves: movesCounter
  };

  
  const checkForColumnOfFive = useCallback(() => {
    for (let i = 0; i < 39; i++) {
      const columnOfFive = [
        i,
        i + width,
        i + width * 2,
        i + width * 3,
        i + width * 4,
      ];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;
      if (
        columnOfFive.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 5);
        columnOfFive.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  }, [currentColorArrangement]);

  const checkForColumnOfFour = useCallback(() => {
    for (let i = 0; i < 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;
      if (
        columnOfFour.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 4);
        colorMoves(decidedColor);
        columnOfFour.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  }, [currentColorArrangement]);

  const checkForColumnOfThree = useCallback(() => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;
      if (
        columnOfThree.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 3);
        colorMoves(decidedColor);
        columnOfThree.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  }, [currentColorArrangement]);

  const checkForRowOfFive = useCallback(() => {
    for (let i = 0; i <= 39; i++) {
      const rowOfFive = [i, i + 1, i + 2, i + 3, i + 4];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38,
        39, 44, 45, 46, 47, 52, 53, 54, 55, 61, 62, 63, 64,
      ];
      const isBlank = currentColorArrangement[i] === blank;

      if (notValid.includes(i)) continue;

      if (
        rowOfFive.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 5);
        colorMoves(decidedColor);
        rowOfFive.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  }, [currentColorArrangement]);

  const checkForRowOfFour = useCallback(() => {
    for (let i = 0; i <= 39; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      const isBlank = currentColorArrangement[i] === blank;

      if (notValid.includes(i)) continue;

      if (
        rowOfFour.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 4);
        colorMoves(decidedColor);
        rowOfFour.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  }, [currentColorArrangement]);

  const checkForRowOfThree = useCallback(() => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      const isBlank = currentColorArrangement[i] === blank;

      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 3);
        colorMoves(decidedColor);
        rowOfThree.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  }, [currentColorArrangement]);

  const moveIntoSquareBelow = useCallback(() => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColorArrangement[i] === blank) {
        let randomnumber = Math.floor(Math.random() * fruitTiles.length);
        currentColorArrangement[i] = fruitTiles[randomnumber].img;
      }
      if (currentColorArrangement[i + width] === blank) {
        currentColorArrangement[i + width] = currentColorArrangement[i];
        currentColorArrangement[i] = blank;
      }
    }
  }, [currentColorArrangement]);

  const dragStart = (e) => {
    setSquareBeingDragged(e.target);
  };

  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target);
  };

  const dragEnd = (e) => {
    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute("data-id")
    );
    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute("data-id")
    );

    currentColorArrangement[squareBeingReplacedId] =
      squareBeingDragged.getAttribute("src");
    currentColorArrangement[squareBeingDraggedId] =
      squareBeingReplaced.getAttribute("src");

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width,
    ];

    const validMove = validMoves.includes(squareBeingReplacedId);
    const isAColumnOfFive = checkForColumnOfFive();
    const isAColumnOfFour = checkForColumnOfFour();
    const isAColumnOfThree = checkForColumnOfThree();
    const isARowOfFive = checkForRowOfFive();
    const isARowOfFour = checkForRowOfFour();
    const isARowOfThree = checkForRowOfThree();

    if (
      squareBeingReplacedId &&
      validMove &&
      (isARowOfFive ||
        isARowOfFour ||
        isARowOfThree ||
        isAColumnOfFive ||
        isAColumnOfFour ||
        isAColumnOfThree)
    ) {
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
      setMovesCounter((moves) => moves - 1);
    } else {
      currentColorArrangement[squareBeingReplacedId] =
        squareBeingReplaced.getAttribute("src");
      currentColorArrangement[squareBeingDraggedId] =
        squareBeingDragged.getAttribute("src");
      setCurrentColorArrangement([...currentColorArrangement]);
    }
  };

  const colorMoves = (color) => {
    let currentFruit = fruitTiles.find((fruit) => fruit.img === color);
    currentFruit.matches = currentFruit.matches + 1;
  };

  const generateWinCondition = () => {
    let randomNumber = Math.ceil(Math.random() * 5)
    let chosenColor = fruitTiles[randomNumber].color
    let pairsNumber = Math.ceil(Math.random() * (15 - 3 + 1) + 3)
    if (colorCondition === null && movesCondition === null) {
      setColorConditions(chosenColor)
      setMovesConditions(pairsNumber)
      setMovesCounter(pairsNumber + 5)
    }
    return
  }

  const createBoard = () => {
    generateWinCondition()
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor = fruitTiles[Math.floor(Math.random() * fruitTiles.length)].img;
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForRowOfFive();
      checkForRowOfFour();
      checkForRowOfThree();
      checkForColumnOfFive();
      checkForColumnOfFour();
      checkForColumnOfThree();
      moveIntoSquareBelow();
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkForColumnOfFive,
    checkForRowOfFive,
    checkForColumnOfFour,
    checkForRowOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
    moveIntoSquareBelow,
    currentColorArrangement,
  ]);

  return (
    <div>
      <div className="scores">
      <ScoreBoard score={scoreDisplay} winCondition={winCondition}  />
      </div>
      <div className="app">
        <div className="game">
          {currentColorArrangement.map((fruitColor, index) => (
            <img
              key={index}
              src={fruitColor}
              alt={fruitColor}
              data-id={index}
              draggable={true}
              onDragStart={dragStart}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
            ></img>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
