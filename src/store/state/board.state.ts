import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
// import { Board } from '../models/Board';
import { UpdateBoard, UpdateGameover, UpdateTurn } from '../actions/board.action';
import { Board } from '../models/Board';


export interface BoardStateModel {
  board: Board | number[][];
  turn?: 0 | 1;
  gameover?: boolean;
}

@State<BoardStateModel>({
  name: 'board',
  defaults: {
    board: [
      [4, 4, 4, 4, 4, 4, 0],
      [4, 4, 4, 4, 4, 4, 0]
    ],
    turn: 1,
    gameover: false,
  }
})

@Injectable()
export class BoardState {

  @Selector()
  static getBoard(state: BoardStateModel) {
    console.log("=====>>>>", state);
    return state.board;
  }

  @Selector()
  static getTurn(state: BoardStateModel) {
    return state.turn;
  }

  @Selector()
  static isGameOver(state: BoardStateModel) {
    return state.gameover;
  }


  @Action(UpdateBoard)
  updateBoard({ getState, patchState }: StateContext<BoardStateModel>, { payload }: UpdateBoard) {
    // console.log('HEREEEE',getState());
    patchState({
      board: payload
    });
  }

  @Action(UpdateTurn)
  updateTurn({ getState, patchState }: StateContext<BoardStateModel>, { payload }: UpdateTurn) {
    patchState({
      turn: payload
    });
  }

  @Action(UpdateGameover)
  isGameover({ getState, patchState }: StateContext<BoardStateModel>, { payload }: UpdateGameover) {
    patchState({
      gameover: payload
    });
  }
}
