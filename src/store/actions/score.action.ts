import { Score } from '../models/Score';

export class UpdateScore {
  static readonly type = '[Score] Add';

  constructor(public payload: Score) { }
}
