class Node{
  constructor(divReference, row, col, isStart = false, isEnd = false, isWall = false, weight = 0){
    this.row = row;
    this.col = col;
    this.isStart = isStart;
    this.isEnd = isEnd;
    this.isWall = isWall;
    this.divReference = divReference;
    this.weight = weight;
  }

}
