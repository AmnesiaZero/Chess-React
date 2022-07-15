import React, { FC, useEffect, useRef, useState } from "react";
import { Colors } from "../models/Colors";
import { Player } from "../models/Player";

interface TimerProps {
  whiteScoreCount: number;
  blackScoreCount: number;
  currentPlayer: Player | null;
  restart: () => void;
  rapid: number;
  setStartGame: (v:boolean) => void;
  setEndGame: (v: Array<boolean | string | null>) => void;
  whitePlayerName: string;
  blackPlayerName: string;
}

const Timer: FC<TimerProps> = ({
  whiteScoreCount,
  blackScoreCount,
  currentPlayer,
  restart,
  rapid,
  setStartGame,
  setEndGame,
  whitePlayerName,
  blackPlayerName,
}) => {
  const [blackTime, setBlackTime] = useState(rapid);
  const [whiteTime, setWhiteTime] = useState(rapid);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    startTimer();
  }, [currentPlayer]);

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }
    const callback =
      currentPlayer?.color === Colors.WHITE
        ? decrementWhiteTimer
        : decrementBlackTimer;
    timer.current = setInterval(callback, 1000);
  }

  function compareScores() {
    if (whiteScoreCount > blackScoreCount) {
      return whitePlayerName;
    } else if (whiteScoreCount === blackScoreCount) {
      return "Дружбой";
    } else {
      return blackPlayerName;
    }
  }

  function decrementWhiteTimer() {
    let scores = compareScores();
    setWhiteTime((prev) => {
      if (prev - 1 === 0) {
        setEndGame([true, scores]);
      }
      return prev - 1;
    });
  }

  function decrementBlackTimer() {
    let scores = compareScores();
    setBlackTime((prev) => {
      if (prev - 1 === 0) {
        setEndGame([true, scores]);
      }
      return prev - 1;
    });
  }

  function restartTimer() {
    restart();
    setBlackTime(rapid);
    setWhiteTime(rapid);
  }

  function restartGame() {
    setStartGame(false);
    setEndGame([false, null]);
    restart();
  }
  

  return (
    <div className="timer">
      <h2 className="timer__white-time timer__elem">
        {whitePlayerName} - {whiteTime}
      </h2>
      <h2 className="timer__white-time timer__elem">
        {blackPlayerName} - {blackTime}
      </h2>
      <button
        className="button timer__restart-timer timer__elem"
        onClick={restartTimer}
      >
        Перезапустить таймер
      </button>
      <button
        className="button timer__restart-game timer__elem"
        onClick={restartGame}
      >
        Перезапустить игру
      </button>
    </div>
  );
};

export default Timer;
