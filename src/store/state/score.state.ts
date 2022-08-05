import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Score } from '../models/Score';
import { UpdateScore } from '../actions/score.action';


export interface ScoreStateModel {
  score: Score;
}

@State<ScoreStateModel>({
  name: 'score',
  defaults: {
    score: {
      playerScore: 0,
      opponentScore: 0,
    },
  }
})


export class ScoreState {

  @Selector()
  static getScore(state: ScoreStateModel) {
    return state.score;
  }

  @Action(UpdateScore)
  update({ getState, patchState }: StateContext<ScoreStateModel>, { payload }: UpdateScore) {
    const state = getState();
    patchState({
      score: {
        playerScore: state.score.playerScore + payload.playerScore,
        opponentScore: state.score.opponentScore + payload.opponentScore
      }
    });
  }
}
