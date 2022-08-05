import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-player-side',
  templateUrl: './player-side.component.html',
  styleUrls: ['./player-side.component.css']
})
export class PlayerSideComponent implements OnInit {

  @Input() playerSide: boolean = false;
  @Input() board: any;

  index: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.index = this.playerSide ? 0 : 1;
  }

  @Output() sendStones = new EventEmitter<[number, number]>();

  takeLocation(event: [number, number]) {
    return this.sendStones.emit(event);
  }

}
