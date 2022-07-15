import React, { useEffect, useState } from "react";
import "./App.css";
import BoardComponent from "./components/BoardComponent";
import EndOfGame from "./components/EndOfGame";
import LostFigures from "./components/LostFigures";
import ScoreCounter from "./components/ScoreCounter";
import Settings from "./components/Settings";
import Timer from "./components/Timer";
import { Board } from "./models/Board";
import { Colors } from "./models/Colors";
import { Player } from "./models/Player";

function App() {
  const [startGame, setStartGame] = useState(false);
  const [endGame, setEndGame] = useState<Array<boolean | string | null>>([
    false,
    null,
  ]);
  const [board, setBoard] = useState(new Board());
  const [blackPlayerName, setBlackPlayerName] = useState<string>("Чёрный");
  const [whitePlayerName, setWhitePlayerName] = useState<string>("Белый");
  const [currentName, setCurrentName] = useState<string | null>("");
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [rapid, setRapid] = useState<number>(300);
  const [whiteScoreCount, setWhiteScoreCount] = useState(0);
  const [blackScoreCount, setBlackScoreCount] = useState(0);
  const [check, setCheck] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [lostVisible, setLostsVisible] = useState(false);

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
    setCurrentName(whitePlayerName);
  }, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
    setCurrentName(whitePlayerName);
    setWhiteScoreCount(0);
    setBlackScoreCount(0);
    setCheck(false);
  }

  function swapPlayer() {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
  }

  function swapName() {
    setCurrentName(
      currentPlayer?.color === Colors.WHITE ? whitePlayerName : blackPlayerName
    );
  }

  function toggleLosts() {
    if (lostVisible) {
      setLostsVisible(false);
    } else {
      setLostsVisible(true);
      setInfoVisible(false);
    }
  }

  function toggleInfo() {
    if (infoVisible) {
      setInfoVisible(false);
    } else {
      setInfoVisible(true);
      setLostsVisible(false);
    }
  }

  function saveBoard() {
    const currentBoard = board.getCopyBoard();
    const boardObject = {
      cells: currentBoard.cells,
      allFigures: currentBoard.allFigures,
      lostBlackFigures: currentBoard.lostBlackFigures,
      lostWhiteFigures: currentBoard.lostWhiteFigures
    }
    localStorage.setItem("savedBoard", JSON.stringify(boardObject));
  }

  function loadBoard() {
    const savedBoard = localStorage.getItem("savedBoard");
    if (savedBoard) {
      board.cells = JSON.parse(savedBoard).cells;
      board.allFigures = JSON.parse(savedBoard).allFigures;
      board.lostBlackFigures = JSON.parse(savedBoard).lostBlackFigures;
      board.lostWhiteFigures = JSON.parse(savedBoard).lostWhiteFigures;
    }
    
  }

  useEffect(() => {
    if (window.innerWidth > 1024) {
      setLostsVisible(true);
      setInfoVisible(true);
    } else {
      setLostsVisible(false);
      setInfoVisible(false);
    }
      window.addEventListener("resize", () => {
        if (window.innerWidth > 1024) {
          setLostsVisible(true);
          setInfoVisible(true);
        } else {
          setLostsVisible(false);
          setInfoVisible(false);
        }
      });
  }, []);

  return (
    <div className="body">
      {startGame ? (
        <div>
          {!endGame[0] ? (
            <div className="container">
              <div className="navbar">
                <div className="navbar__info-button button" onClick={toggleInfo}>
                  Info
                </div>
                <div className="navbar__losts-button button" onClick={toggleLosts}>
                  Losts
                </div>
              </div>
              <div
                className={["info", infoVisible ? "showed" : "hidden"].join(
                  " "
                )}
              >
                <h2 className="current-turn">Сейчас ходит: {currentName}</h2>
                <Timer
                  whiteScoreCount={whiteScoreCount}
                  blackScoreCount={blackScoreCount}
                  currentPlayer={currentPlayer}
                  restart={restart}
                  rapid={rapid}
                  setStartGame={setStartGame}
                  setEndGame={setEndGame}
                  whitePlayerName={whitePlayerName}
                  blackPlayerName={blackPlayerName}
                />
                <ScoreCounter
                  board={board}
                  whiteScoreCount={whiteScoreCount}
                  blackScoreCount={blackScoreCount}
                  setWhiteScoreCount={setWhiteScoreCount}
                  setBlackScoreCount={setBlackScoreCount}
                />
                <div className="check">{check ? "Шах!!" : "Шаха нет"}</div>
              </div>
              <div className="App">
                <BoardComponent
                  board={board}
                  setBoard={setBoard}
                  check={check}
                  setCheck={setCheck}
                  currentPlayer={currentPlayer}
                  currentName={currentName}
                  swapPlayer={swapPlayer}
                  swapName={swapName}
                  setEndGame={setEndGame}
                />
              </div>
              <div
                className={["losts", lostVisible ? "showed" : "hidden"].join(
                  " "
                )}
              >
                <LostFigures
                  title={`Потери ${whitePlayerName}`}
                  figures={board.lostWhiteFigures}
                />
                <LostFigures
                  title={`Потери ${blackPlayerName}`}
                  figures={board.lostBlackFigures}
                />
              </div>
            </div>
          ) : (
            <EndOfGame
              winnerName={endGame[1]}
              setEndGame={setEndGame}
              setStartGame={setStartGame}
              restart={restart}
            />
          )}
        </div>
      ) : (
        <Settings
          setRapid={setRapid}
          rapid={rapid}
          setBlackPlayerName={setBlackPlayerName}
          blackPlayerName={blackPlayerName}
          setWhitePlayerName={setWhitePlayerName}
          whitePlayerName={whitePlayerName}
          setStartGame={setStartGame}
        />
      )}
    </div>
  );
}

export default App;
