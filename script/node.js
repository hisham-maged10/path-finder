class Node{
  constructor(divReference, row, col, isStart = false, isEnd = false, isWall = false){
    this.row = row;
    this.col = col;
    this.isStart = isStart;
    this.isEnd = isEnd;
    this.isWall = isWall;
    this.divReference = divReference;
  }

  // get divReference(){
  //   return this.divReference;
  // }
  //
  // get position(){
  //   return {row:this.row, col:this.col};
  // }
}
