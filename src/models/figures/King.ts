import { Figure, FigureNames } from "./Figure";
import { Cell } from "../Cell";
import { Colors } from "../Colors";
import blackLogo from "../../assets/black-king.png";
import whiteLogo from "../../assets/white-king.png";

export class King extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell); // Вызов контсруктора родительсокго класса
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KING;
  }

  private isEnemyOnVertical(target: Cell): boolean {
    if (this.cell.x != target.x) {
      return false;
    }

    const min = Math.min(this.cell.y, target.y);
    const max = Math.max(this.cell.y, target.y);

    for (let y = min + 1; y < max; y++) {
      const targetCell = this.cell.board.getCell(this.cell.x, y);
      if (targetCell.figure) {
        if (
          (targetCell.figure.name === FigureNames.QUEEN ||
            targetCell.figure.name === FigureNames.ROOK) &&
          targetCell.figure.color != this.color && !this.cell.isEmptyVertical(target)
        ) {
          console.log("Вертикаль");
          return true;
        }
      }
    }
    return false;
  }

  private isEnemyOnHorizontal(target: Cell): boolean {
    if (this.cell.y != target.y) {
      return false;
    }

    const min = Math.min(this.cell.x, target.x);
    const max = Math.max(this.cell.x, target.x);

    for (let x = min + 1; x < max; x++) {
      const targetCell = this.cell.board.getCell(x, this.cell.y);
      if (targetCell.figure) {
        if (
          (targetCell.figure.name === FigureNames.QUEEN ||
            targetCell.figure.name === FigureNames.ROOK) &&
          targetCell.figure.color != this.color && !this.cell.isEmptyHorizontal(target)
        ) {
          console.log("Горизонталь");
          return true;
        }
      }
    }
    return false;
  }

  private isEnemyOnDiagonal(target: Cell): boolean {
    const absX = Math.abs(target.x - this.cell.x);
    const absY = Math.abs(target.y - this.cell.y);
    if (absY !== absX) {
      return false;
    }

    const dy = this.cell.y < target.y ? 1 : -1;
    const dx = this.cell.x < target.x ? 1 : -1;

    for (let i = 1; i < absY; i++) {
      const targetCell = this.cell.board.getCell(
        this.cell.x + dx * i,
        this.cell.y + dy * i
      );
      if (targetCell.figure) {
        if (
          (targetCell.figure.name === FigureNames.QUEEN ||
            targetCell.figure.name === FigureNames.BISHOP) &&
          targetCell.figure.color != this.color && !this.cell.isEmptyDiagonal(target)
        ) {
          console.log("Диагональ");
          return true;
        }
      }
    }

    return false;
  }

  private enemyIsPawn(target: Cell) {
    const dx = Math.abs(this.cell.x - target.x);
    const dy = Math.abs(this.cell.y - target.y);

    if (dx === 1 && dy === 1) {
      if (
        target.figure?.name === FigureNames.PAWN &&
        target.figure.color != this.color
      ) {
        console.log("Пешка");
        return true;
      }
    }

    return false;
  }

  private enemyIsKnight(target: Cell) {
    const dx = Math.abs(this.cell.x - target.x);
    const dy = Math.abs(this.cell.y - target.y);

    if ((dx === 2 && dy === 1) || (dx === 1 && dy === 2)) {
      if (
        target.figure?.name === FigureNames.KNIGHT &&
        target.figure.color != this.color
      ) {
        return true;
      }
    }

    return false;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }

    const allFigures = this.cell.board.allFigures;
    const dx = Math.abs(this.cell.x - target.x);
    const dy = Math.abs(this.cell.y - target.y);

    // рабочий код
    // for (let i = 0; i < allFigures.length; i++) {
    //   if (
    //     allFigures[i].color != this.color &&
    //     allFigures[i].availableTurns.includes(target)
    //   ) {
    //     return false;
    //   }
    // }
    if (
      !(
        (dy === 1 && dx === 1) ||
        (dx === 0 && dy === 0) ||
        (dx === 1 && dy === 0) ||
        (dx === 0 && dy === 1)
      )
    ) {
      return false;
    }
    // конец рабочего кода

    // if (
    //   (this.isEnemyOnDiagonal(target) ||
    //     this.isEnemyOnHorizontal(target) ||
    //     this.isEnemyOnVertical(target) ||
    //     this.enemyIsPawn(target) ||
    //     this.enemyIsKnight(target)) ||
    //   !(
    //     (dy === 1 && dx === 1) ||
    //     (dx === 0 && dy === 0) ||
    //     (dx === 1 && dy === 0) ||
    //     (dx === 0 && dy === 1)
    //   )
    // ) {
    //   return false;
    // }

    return true;
  }
}
