import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-hole',
  templateUrl: './hole.component.html',
  styleUrls: ['./hole.component.css']
})
export class HoleComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
  }

  @Input() location: number = 0;

  @Input() index: number = 0;

  @Input() isSumHole: boolean = false;

  @Output() setStones = new EventEmitter<[number, number]>();

  @Input() stone: number = 0;

  onClick() {
    if (this.location == 6) {
      return;
    }
    this.setStones.emit([this.index, this.location]);
  }

}
