import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { UpdateBoard, UpdateGameover, UpdateTurn } from "src/store/actions/board.action";
import { UpdateScore } from "src/store/actions/score.action";
import { Board } from "src/store/models/Board";
import { BoardState } from "src/store/state/board.state";
import { ScoreState } from "src/store/state/score.state";

export class GameLogic {

  turn: 0 | 1 = 0;
  gameover: boolean = false;

  constructor(private store: Store) {
    this.store.dispatch(new UpdateBoard([
      [4, 4, 4, 4, 4, 4, 0],
      [4, 4, 4, 4, 4, 4, 0]
    ]));
    this.turn = this.store.selectSnapshot(BoardState.getTurn) as 0 | 1;
    this.gameover = this.store.selectSnapshot(BoardState.isGameOver) as boolean;
  }


  click(side: number, index: number): void {
    let board = this.store.selectSnapshot(BoardState.getBoard);
    //this.getBoard();

    this.turn = this.store.selectSnapshot(BoardState.getTurn) as 0 | 1;

    // board.subscribe(stones1 => {
    let stones = JSON.parse(JSON.stringify(board))


    let inhand = stones[side][index];
    if (side !== this.turn || !inhand || this.gameover) return;

    stones[side][index] = 0;

    // deposit stones
    let last;
    while (inhand) {
      index++;
      if (index > 6) {
        side = Math.abs(side - 1);
        index = 0;
      }
      last = stones[side][index];
      if (index < 6 || this.turn === side) {
        stones[side][index] += 1;
        inhand--;
      }
    }
    if (!last && index < 6 && side === this.turn) {
      let oppSide = Math.abs(side - 1);
      let oppIndex = 5 - index;
      let oppVal = stones[oppSide][oppIndex];
      stones[oppSide][oppIndex] = 0;
      stones[side][index] = 0;
      stones[side][6] += oppVal + 1;
    }

    let remain = this.isGameOver(stones);

    if (remain != false) {
      stones[0][6] += (remain as number[])[0];
      stones[1][6] += (remain as number[])[1];
      this.gameover = true;
      this.updateGameover(this.gameover);
      this.setScore();
    } else if (index !== 6) {
      this.turn = Math.abs(this.turn - 1) as 0 | 1;
    }
    this.updateTurn(this.turn);
    this.updateBoard(stones as number[][]);
    // });

  }

  isGameOver(stones: number[][]): boolean | number[] {
    const remain = [
      stones[0].reduce((t, s) => t + s, 0) - stones[0][6],
      stones[1].reduce((t, s) => t + s, 0) - stones[1][6]
    ];

    if (!remain[0] || !remain[1]) {
      return remain;
    }
    return false;
  }

  getBoard(): Observable<number[][]> {
    return this.store.select(BoardState.getBoard) as Observable<number[][]>;
  }

  updateBoard(board: Board | number[][]) {
    return this.store.dispatch(new UpdateBoard(board));
  }

  updateTurn(turn: 0 | 1) {
    this.store.dispatch(new UpdateTurn(turn));
  }

  updateGameover(gameover: boolean) {
    this.store.dispatch(new UpdateGameover(gameover));
  }

  setScore() {
    if (!this.gameover) return;

    this.store.dispatch(new UpdateScore({
      playerScore: this.turn == 1 ? 1 : 0,
      opponentScore: this.turn == 0 ? 1 : 0,
    }));
  }

  resetBoard() {
    this.updateBoard({ board: [[4, 4, 4, 4, 4, 4, 0], [4, 4, 4, 4, 4, 4, 0]] });

    this.store.dispatch(new UpdateScore({ playerScore: 0, opponentScore: 0 }));
  }

}
