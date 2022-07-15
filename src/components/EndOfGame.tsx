import React, { FC } from "react";
import { Player } from '../models/Player';

interface EndOfGameProps {
  winnerName: string|boolean|null;
  setStartGame: (v:boolean) => void;
  setEndGame: (v: Array<boolean | string | null>) => void;
  restart: () => void;
}

const EndOfGame: FC<EndOfGameProps> = ({
  winnerName,
  setStartGame,
  setEndGame, 
  restart
}) => {
    function restartGame() {
        setStartGame(false);
        setEndGame([false, null]);
        restart();
    }

    function getRandomArbitrary(min: number, max: number) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    const phrases = ["Победа, Победа, время ОБЕДА!!!", "Победа есть?? Время ПОЕСТЬ!!"];
  return (
    <div className="endOfGame-container">
      <h1 className="endOfGame__title">
        {phrases[getRandomArbitrary(0, phrases.length-1)]}
      </h1>
      <h1 className="endOfGame__title">{`Победа за ${winnerName}`}</h1>
      <button className="button endOfGame__button" onClick={restartGame}>Сначала</button>
    </div>
  );
};

export default EndOfGame;
