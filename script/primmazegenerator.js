function generateMazePrim(grid,frontierList,choices){
    if(frontierList.length){
      let rnd = Math.floor(Math.random() * frontierList.length);
      let batch = frontierList[rnd];
      frontierList.splice(rnd,1);
      let inBetween = batch[0];
      let frontier = batch[1];
      if(frontier.isWall){
        frontier.isWall = false;
        frontier.divReference.classList.remove("node-wall");
        frontier.divReference.classList.add("node-passage");
        inBetween.isWall = false;
        inBetween.divReference.classList.remove("node-wall");
        inBetween.divReference.classList.add("node-passage");
        computeFrontierCells(grid,frontier,frontierList,choices);
      }
      setTimeout(generateMazePrim,0,grid,frontierList,choices);
    }else{
      chooseRndStartEnd();
      document.querySelector("#clear").disabled = false;
      document.querySelector("#size-slider").disabled = false;
  document.querySelector("#path-finding-grp-btn").disabled = false;
  document.querySelector("#maze-generation-grp-btn").disabled = false;
    }
}
function generateMazePrimRT(grid){
    clearGrid(0,false,false);
    for(let i = 0 ; i < grid.length ; ++i){
      for(let j = 0 ; j < grid[i].length ; ++j){
        grid[i][j].divReference.classList.add("node-wall");
        grid[i][j].isWall = true;
      }
    }
    let choices = [[-2,0],[0,2],[2,0],[0,-2]];
    // picking random cell and making it a passage
    let cell = grid[Math.floor(Math.random() * grid.length)][Math.floor(Math.random() * grid[0].length)];
    cell.isWall = false;
    cell.divReference.classList.remove("node-wall");
    // compute frontier cells of picked random cell
    let frontierList = [];
    computeFrontierCells(grid,cell,frontierList,choices);
    while(frontierList.length){
      let rnd = Math.floor(Math.random() * frontierList.length);
      let batch = frontierList[rnd];
      frontierList.splice(rnd,1);
      let inBetween = batch[0];
      let frontier = batch[1];
      if(frontier.isWall){
        frontier.isWall = false;
        frontier.divReference.classList.remove("node-wall");
        inBetween.isWall = false;
        inBetween.divReference.classList.remove("node-wall");
        computeFrontierCells(grid,frontier,frontierList,choices);
      }
    }
  chooseRndStartEnd();
  document.querySelector("#clear").disabled = false;
  document.querySelector("#size-slider").disabled = false;
  document.querySelector("#path-finding-grp-btn").disabled = false;
  document.querySelector("#maze-generation-grp-btn").disabled = false;
}
function computeFrontierCells(grid, cell, frontierList, choices){
  for(let i = 0 ; i < choices.length ; ++i){
    let row = cell.row + choices[i][0];
    let col = cell.col + choices[i][1];
    if(grid[row] && grid[row][col] && grid[row][col].isWall){
        let frontier = grid[row][col];
        let inBetween = null;
        if(choices[i][0] === -2){
          inBetween = grid[cell.row-1][cell.col];
        }else if(choices[i][0] === 2){
          inBetween = grid[cell.row+1][cell.col];
        }else if(choices[i][1] === -2){
          inBetween = grid[cell.row][cell.col - 1];
        }else if(choices[i][1] === 2){
          inBetween = grid[cell.row][cell.col + 1];
        }
        frontierList.push([inBetween,frontier]);
    }
  }
}
