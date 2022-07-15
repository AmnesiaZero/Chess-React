import { Figure, FigureNames } from "./Figure";
import { Cell } from "../Cell";
import { Colors } from "../Colors";
import blackLogo from "../../assets/black-pawn.png";
import whiteLogo from "../../assets/white-pawn.png";

export class Pawn extends Figure {
  isFirstStep: boolean = true;

  constructor(color: Colors, cell: Cell) {
    super(color, cell); // Вызов контсруктора родительсокго класса
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.PAWN;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
    const firstStepDirection =
      this.cell.figure?.color === Colors.BLACK ? 2 : -2;

    if (
      ((target.y === this.cell.y + direction) ||
        (this.isFirstStep && target.y === this.cell.y + firstStepDirection)) &&
      target.x === this.cell.x &&
      this.cell.board.getCell(target.x, target.y).isEmpty()
    ) {
      return true;
    }

    if (
      !target.isEmpty() &&
      Math.abs(target.y - this.cell.y) === 1 &&
      Math.abs(target.x - this.cell.x) === 1
    ) {
      return true;
    }

    return false;
  }

  moveFigure(target: Cell) {
    super.moveFigure(target);
    this.isFirstStep = false;
  }
}
