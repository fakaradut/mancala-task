import { Component, OnInit, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UpdateScore } from 'src/store/actions/score.action';
import { Score } from 'src/store/models/Score';
import { BoardState, BoardStateModel } from 'src/store/state/board.state';
import { ScoreState, ScoreStateModel } from 'src/store/state/score.state';
import { GameLogic } from 'src/utils/game-logic/game-logic';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  gameLogic;
  board: any;

  @Select(BoardState) turn$: Observable<BoardStateModel>;
  @Select(ScoreState) score$: Observable<ScoreStateModel>;

  turn: 0 | 1 | undefined = 0;
  score: Score;

  constructor(private store: Store) {
    this.gameLogic = new GameLogic(store);
  }

  ngOnInit(): void {
    this.board = this.store.selectSnapshot(BoardState.getBoard) as number[][];

    this.turn$.subscribe(value => {
      this.turn = value.turn;
      console.warn(value)
    });

    this.store.dispatch(new UpdateScore({
      opponentScore: 0,
      playerScore: 0,
    }));

    this.score$.subscribe(value => {
      console.log(value);
      this.score = value.score;
    });
  }

  clickHole(event: [number, number]) {
    this.gameLogic.click(event[0], event[1]);
    this.board = this.store.selectSnapshot(BoardState.getBoard) as number[][];
  }

  resetGame() {
    this.gameLogic.resetBoard();
    this.board = this.store.selectSnapshot(BoardState.getBoard) as number[][];
  }

}
