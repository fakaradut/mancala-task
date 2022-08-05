import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { HoleComponent } from './hole/hole.component';
import { PlayerSideComponent } from './player-side/player-side.component';
import { BoardComponent } from './board/board.component';
import { ScoreState } from 'src/store/state/score.state';
import { BoardState } from 'src/store/state/board.state';


@NgModule({
  declarations: [
    AppComponent,
    HoleComponent,
    PlayerSideComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([
      ScoreState,
      BoardState,
    ], {
      developmentMode: !environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
