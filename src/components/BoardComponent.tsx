import React, { useState, useEffect } from "react";
import { FC } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import { Colors } from "../models/Colors";
import { FigureNames } from "../models/figures/Figure";
import { Player } from "../models/Player";
import { Queen } from "../models/figures/Queen";
import { Bishop } from "../models/figures/Bishop";
import { Rook } from "../models/figures/Rook";
import { Knight } from "../models/figures/Knight";
import { Pawn } from "../models/figures/Pawn";
import CellComponent from "./CellComponent";
import useSound from "use-sound";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  check:boolean;
  setCheck:(v:boolean) => void;
  currentName:string|null;
  currentPlayer: Player | null;
  swapPlayer: () => void;
  swapName: () => void;
  setEndGame: (v:Array<boolean|string|null>) => void;
}

const BoardComponent: FC<BoardProps> = ({
  board,
  setBoard,
  check,
  setCheck,
  currentPlayer,
  currentName,
  swapPlayer,
  swapName,
  setEndGame
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [turnSFX] = useSound("../../sfx/sound.mp3", { volume: 1 });
  const [rotated, setRotated] = useState(false);

  function click(cell: Cell) {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      if (cell?.figure?.name === FigureNames.KING) {
        setEndGame([true, currentName]);
      }

      selectedCell.moveFigure(cell);

      turnSFX();

      const cells = cell.board.cells;
      for (let i = 0; i < cells.length; i++) {
        const row = cells[i];
        for (let j = 0; j < row.length; j++) {
          const target = row[j];
          if (cell?.figure?.canMove(target)) {
            cell.figure.availableTurns.push(target);
          } else {
            if (cell?.figure?.availableTurns.includes(target)) {
              const index = cell?.figure?.availableTurns.indexOf(target);
              cell?.figure?.availableTurns.slice(index, 1);
            }
          }
        }
      }

      let checkFlag = false;
      for (let i = 0; i < board.cells.length; i++) {
        const row = board.cells[i];
        for (let j = 0; j < row.length; j++) {
          const target = row[j];
          if (board.check(target)) {
            checkFlag = true;
          }
        }
      }

      if (
        cell?.figure?.name === FigureNames.PAWN &&
          (cell.y === 0 ||
        cell.y === 7)
      ) {
        const figures = [
          new Queen(cell?.figure?.color, board.getCell(cell.x, cell.y)),
          new Rook(cell?.figure?.color, board.getCell(cell.x, cell.y)),
          new Knight(cell?.figure?.color, board.getCell(cell.x, cell.y)),
          new Bishop(cell?.figure?.color, board.getCell(cell.x, cell.y)),
          new Pawn(cell?.figure?.color, board.getCell(cell.x, cell.y)),
        ];
        let r = getRandomArbitrary(0, 4);
        cell.figure = figures[r];
      }
        
      setCheck(checkFlag);
      swapPlayer();
      swapName();
      setSelectedCell(null);
      toggleRotate();
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell);
      }
    }
  }

  useEffect(() => {
    hightlightCells();
    swapName();
  }, [selectedCell]);

  function getRandomArbitrary(min:number, max:number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function defineCheckSide() {
    if (check) {
      if (currentPlayer?.color === Colors.WHITE) {
        return Colors.WHITE;
      } else if (currentPlayer?.color === Colors.BLACK) {
        return Colors.BLACK;
      }
    } else {
      return null;
    }
  }

  function hightlightCells() {
    board.hightlightCells(selectedCell);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  function toggleRotate() {
    if (rotated) {
      setRotated(false);
    } else {
      setRotated(true);
    }
  }

  return (
    <div className="board-container">
      
      <div className={['board', rotated ? 'rotated' : ''].join(' ')}>
        {board.cells.map((row, index) => (
          <React.Fragment key={index}>
            {row.map((cell) => (
              <CellComponent
                cell={cell}
                key={cell.id}
                selected={
                  cell.x === selectedCell?.x && cell.y === selectedCell?.y
                }
                click={click}
                rotated={rotated ? 'rotated' : ''}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BoardComponent;
