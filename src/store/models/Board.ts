export class Board {
  board: Hole | number[][] = new Hole();
}

class Hole {
  board: number[][] = [
    [4, 4, 4, 4, 4, 4, 0],
    [4, 4, 4, 4, 4, 4, 0]
  ];
}
