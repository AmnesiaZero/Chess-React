import React, { FC, useEffect } from "react";
import { Board } from "../models/Board";
import { Colors } from "../models/Colors";
import { FigureNames } from "../models/figures/Figure";
import { Player } from '../models/Player';

interface ScoreCounterProps {
  board: Board;
  whiteScoreCount:number;
  blackScoreCount:number;
  setWhiteScoreCount:(v:any) => void;
  setBlackScoreCount:(v:any) => void;
}

const ScoreCounter: FC<ScoreCounterProps> = ({
  board,
  whiteScoreCount,
  blackScoreCount,
  setWhiteScoreCount,
  setBlackScoreCount
}) => {

  if (board.lostBlackFigures) {
    let sum = 0;
    board.lostBlackFigures.forEach((elem) => {
      let score = 0;
      if (elem.name === FigureNames.QUEEN) {
        score = 500;
      }
      if (elem.name === FigureNames.KNIGHT) {
        score = 250;
      }
      if (elem.name === FigureNames.BISHOP) {
        score = 250;
      }
      if (elem.name === FigureNames.ROOK) {
        score = 250;
      }
      if (elem.name === FigureNames.PAWN) {
        score = 125;
      }
      sum += score;
    });
    setWhiteScoreCount(sum);
  }

  if (board.lostWhiteFigures) {
    let sum = 0;
    board.lostWhiteFigures.forEach((elem) => {
      let score = 0;
      if (elem.name === FigureNames.KING) {
        score = 1000;
      }
      if (elem.name === FigureNames.QUEEN) {
        score = 500;
      }
      if (elem.name === FigureNames.KNIGHT) {
        score = 250;
      }
      if (elem.name === FigureNames.BISHOP) {
        score = 250;
      }
      if (elem.name === FigureNames.ROOK) {
        score = 250;
      }
      if (elem.name === FigureNames.PAWN) {
        score = 125;
      }
      sum += score;
    });
    setBlackScoreCount(sum);
  }

  

  return (
    <div className="score-counter">
      <span className="white-score">
        Очки белых:{" "}
        {whiteScoreCount}
      </span>
      <br></br>
      <span className="black-score">
        Очки чёрных:{" "}
        {blackScoreCount}
      </span>
    </div>
  );
};

export default ScoreCounter;
