function recursiveBacktracker(grid, s, choices){
  if(s.length){
    let batch = s[s.length - 1];
    let frontier = batch[1];
    let inBetween = batch[0];
    frontier.isWall = false;
    frontier.divReference.classList.remove("node-wall");
    frontier.divReference.classList.add("node-passage");
    inBetween.isWall = false;
    inBetween.divReference.classList.remove("node-wall");
    inBetween.divReference.classList.add("node-passage");
    neighbours = computeFrontierCellsRBT(grid,frontier,choices);
    if(neighbours.length){
      rnd = Math.floor(Math.random () * neighbours.length);
      s.push(neighbours[rnd]);
    }else{
      s.pop();
    }
    setTimeout(recursiveBacktracker,0,grid,s,choices);
  }else{
    chooseRndStartEnd();
    document.querySelector("#clear").disabled = false;
    document.querySelector("#size-slider").disabled = false;
  document.querySelector("#path-finding-grp-btn").disabled = false;
  document.querySelector("#maze-generation-grp-btn").disabled = false;
  }
}

function recursiveBacktrackerRT(grid){
  clearGrid(0,false,false);
  for(let i = 0 ; i < grid.length ; ++i){
    for(let j = 0 ; j < grid[i].length ; ++j){
      grid[i][j].isWall = true;
      grid[i][j].divReference.classList.add("node-wall");
    }
  }

  let cell = grid[Math.floor(Math.random() * grid.length)][Math.floor(Math.random() * grid[0].length)];
  let s = [];
  cell.isWall = false;
  cell.divReference.classList.remove("node-wall");
  let choices = [[-2,0],[0,2],[2,0],[0,-2]];
  let neighbours = computeFrontierCellsRBT(grid,cell,choices);
  let rnd = Math.floor(Math.random () * neighbours.length);
  s.push(neighbours[rnd]);
  while(s.length){
    let batch = s[s.length - 1];
    let frontier = batch[1];
    let inBetween = batch[0];
    frontier.isWall = false;
    frontier.divReference.classList.remove("node-wall");
    inBetween.isWall = false;
    inBetween.divReference.classList.remove("node-wall");
    neighbours = computeFrontierCellsRBT(grid,frontier,choices);
    if(neighbours.length){
      rnd = Math.floor(Math.random () * neighbours.length);
      s.push(neighbours[rnd]);
    }else{
      s.pop();
    }
  }
  chooseRndStartEnd();
  document.querySelector("#clear").disabled = false;
  document.querySelector("#size-slider").disabled = false;
  document.querySelector("#path-finding-grp-btn").disabled = false;
  document.querySelector("#maze-generation-grp-btn").disabled = false;
}


function computeFrontierCellsRBT(grid, cell,choices){
  let neighbours = [];
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
        neighbours.push([inBetween, frontier]);
    }
  }
  return neighbours;
}
