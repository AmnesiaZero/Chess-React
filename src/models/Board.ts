import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";
import { Queen } from "./figures/Queen";
import { King } from "./figures/King";
import { Bishop } from "./figures/Bishop";
import { Knight } from "./figures/Knight";
import { Rook } from "./figures/Rook";
import { Pawn } from "./figures/Pawn";

export class Board {
  cells: Cell[][] = [];
  allFigures: Figure[] = [];
  lostBlackFigures: Figure[] = [];
  lostWhiteFigures: Figure[] = [];

  public initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 != 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null)); // Черные
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null));
        }
      }
      this.cells.push(row);
    }
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.lostBlackFigures = this.lostBlackFigures;
    newBoard.lostWhiteFigures = this.lostWhiteFigures;
    return newBoard;
  }

  public hightlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        if (selectedCell?.figure?.canMove(target)) {
          target.available = true;
        } else {
          target.available = false;
        }
      }
    }
  }

  public check(cell: Cell | null): boolean {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        if (cell?.figure?.canMove(target)) {
          if (cell?.figure?.kingIsUnderAttack(target)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  private addPawns() {
    for (let i = 0; i < 8; i++) {
      this.allFigures.push(new Pawn(Colors.WHITE, this.getCell(i, 6)));
      this.allFigures.push(new Pawn(Colors.BLACK, this.getCell(i, 1)));
    }
  }

  private addKings() {
    this.allFigures.push(new King(Colors.WHITE, this.getCell(3, 7)));
    this.allFigures.push(new King(Colors.BLACK, this.getCell(3, 0)));
  }

  private addQueens() {
    this.allFigures.push(new Queen(Colors.WHITE, this.getCell(4, 7)));
    this.allFigures.push(new Queen(Colors.BLACK, this.getCell(4, 0)));
  }

  private addBishops() {
    this.allFigures.push(new Bishop(Colors.WHITE, this.getCell(2, 7)));
    this.allFigures.push(new Bishop(Colors.WHITE, this.getCell(5, 7)));

    this.allFigures.push(new Bishop(Colors.BLACK, this.getCell(2, 0)));
    this.allFigures.push(new Bishop(Colors.BLACK, this.getCell(5, 0)));
  }

  private addKnights() {
    this.allFigures.push(new Knight(Colors.WHITE, this.getCell(1, 7)));
    this.allFigures.push(new Knight(Colors.WHITE, this.getCell(6, 7)));

    this.allFigures.push(new Knight(Colors.BLACK, this.getCell(1, 0)));
    this.allFigures.push(new Knight(Colors.BLACK, this.getCell(6, 0)));
  }

  private addRooks() {
    this.allFigures.push(new Rook(Colors.WHITE, this.getCell(0, 7)));
    this.allFigures.push(new Rook(Colors.WHITE, this.getCell(7, 7)));

    this.allFigures.push(new Rook(Colors.BLACK, this.getCell(0, 0)));
    this.allFigures.push(new Rook(Colors.BLACK, this.getCell(7, 0)));
  }

  public addFigures() {
    this.addKings();
    this.addQueens();
    this.addBishops();
    this.addKnights();
    this.addRooks();
    this.addPawns();
  }
}
