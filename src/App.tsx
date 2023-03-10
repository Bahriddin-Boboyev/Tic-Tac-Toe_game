import { useState, useEffect } from "react";
import { Cart } from "./pages/cart";

type Scores = {
  [key: string]: number;
};

const INITIAL_GAME_STATE: string[] = ["", "", "", "", "", "", "", "", ""];
let INITIAL_GAME_SCORE: Scores = { X: 0, O: 0 };
const WINING_COMBOS: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [scores, setScores] = useState(INITIAL_GAME_SCORE);

  useEffect(() => {
    const storedScores = localStorage.getItem("scores");
    if (storedScores) {
      setScores(JSON.parse(storedScores));
    }
  }, []);

  useEffect(() => {
    if (gameState === INITIAL_GAME_STATE) {
      return;
    }
    checkForWinner();
  }, [gameState]);

  const resertBoard = () => setGameState(INITIAL_GAME_STATE);

  const handleWin = () => {
    window.alert(`Congrats player ${currentPlayer} ! You are the winner!`);
    const newPlayerScore = scores[currentPlayer] + 1;
    const newScores = { ...scores };
    newScores[currentPlayer] = newPlayerScore;
    setScores(newScores);

    localStorage.setItem("scores", JSON.stringify(newScores));

    resertBoard();
  };
  const handleDraw = () => {
    window.alert("The game ended in a draw");
    resertBoard();
  };

  const checkForWinner = () => {
    let roundWon = false;
    for (let i = 0; i < WINING_COMBOS.length; i++) {
      const winCombo = WINING_COMBOS[i];

      let a = gameState[winCombo[0]];
      let b = gameState[winCombo[1]];
      let c = gameState[winCombo[2]];

      if ([a, b, c].includes("")) {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      setTimeout(() => handleWin(), 500);
      return;
    }
    if (!gameState.includes("")) {
      setTimeout(() => handleDraw(), 500);

      return;
    }
    changePlayer();
  };

  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const handlerCellClick = (event: any) => {
    const cellIndex = Number(event.target.getAttribute("data-cell-index"));

    const currentValue = gameState[cellIndex];
    if (currentValue) {
      return;
    }
    const newValues = [...gameState];
    newValues[cellIndex] = currentPlayer;
    setGameState(newValues);
  };

  return (
    <div className="App">
      <div className="h-full p-8">
        <h1 className="text-center text-5xl mb-4 font-display text-white">
          Tic Tac Toe
        </h1>
        <div className="grid grid-cols-3 gap-3 mx-auto w-[500px]">
          {gameState.map((player, index) => (
            <Cart
              onClick={handlerCellClick}
              key={index}
              {...{ index, player }}
            />
          ))}
        </div>
      </div>
      <div className="text-center">
        {/* <div className="text-white font-display font-thin">
          Board Goes Here: 
        </div> */}
        <div className="mx-auto w-96 text-1xl text-serif">
          <p className="text-[#ff0000be] mt-1 font-primary">
            Next Player: <span>{currentPlayer}</span>
          </p>
          <div className="flex items-center justify-between my-0 mx-auto w-[350px] mt-3">
            <p className="text-[#242424] mt-1 font-primary">
              Player X wins: <span>{scores["X"]}</span>
            </p>
            <p className="text-[#ffffff] mt-1 font-primary">
              Player O wins: <span>{scores["O"]}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
