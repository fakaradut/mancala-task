import { Board } from '../models/Board';

export class UpdateBoard {
  static readonly type = '[Board] Update';

  constructor(public payload: Board | number[][]) { }
}

export class UpdateTurn {
  static readonly type = '[Board Turn] Update';

  constructor(public payload: 0 | 1) { }
}

export class UpdateGameover {
  static readonly type = '[Board Gameover] Update';

  constructor(public payload: boolean) { }
}
