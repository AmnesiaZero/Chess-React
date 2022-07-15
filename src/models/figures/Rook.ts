import { Figure, FigureNames } from "./Figure";
import { Cell } from "../Cell";
import { Colors } from "../Colors";
import blackLogo from '../../assets/black-rook.png';
import whiteLogo from '../../assets/white-rook.png';

export class Rook extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell); // Вызов контсруктора родительсокго класса
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.ROOK;
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target)) {
            return false;
        }
        if(this.cell.isEmptyHorizontal(target) || this.cell.isEmptyVertical(target)) {
            return true;
        }
        return false;
    }
}