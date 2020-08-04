function dfs(grid,start,end,s,parentMap,choices,prev = null)
{
  let curr = null;
  if(s.length){
    curr = s.pop();
    let div = curr.divReference;
    if(parentMap.has(curr)){
      div.classList.add("node-backtrack");
      setTimeout(dfs,15,grid,start,end,s,parentMap,choices,curr);
      return;
    }
    // div.classList.add("node-current");
    // setTimeout(()=> div.classList.remove("node-current"),10);
    // curr.divReference.classList.add("node-check");
    curr.divReference.classList.add("node-current");
    setTimeout(()=> {div.classList.remove("node-current"); div.classList.add("node-check");},1000);
    parentMap.set(curr,prev);
    if(curr === end)
    {
      console.log("FOUND IT!");
      console.log(start.divReference);
      console.log(end.divReference);
      console.log(curr.divReference);
      executeDrawPath(parentMap,curr);
      return;
    }
    for(let i = 0 ; i < choices.length ; ++i)
    {
      let row = curr.row + choices[i][0];
      let col = curr.col + choices[i][1];
      if(grid[row] && grid[row][col] && !grid[row][col].isWall && !parentMap.has(grid[row][col])){
        s.push(grid[row][col]);
        let childDiv = grid[row][col].divReference;
        // childDiv.classList.add("node-child");
        // setTimeout(() => childDiv.classList.remove("node-child"), 10);
      }
    }
    setTimeout(dfs,10,grid,start,end,s,parentMap,choices,curr);
  }else{
    console.log("NOT FOUND!");
    return;
  }
}

function dfsRT(grid, start, end){
  let curr = start;
  let s = [];
  let choices = [[-1,0],[1,0],[0,1],[0,-1]];
  s.push(curr);
  let visited = new Set();
  while(s.length){
    curr = s.pop();
    if(visited.has(curr)){
      continue;
    }
    if(curr === end){
      console.log("done");
      return;
    }
    visited.add(curr);
    for(let i = 0 ; i < choices.length ; ++i){
      let row = curr.row + choices[i][0];
      let col = curr.col + choices[i][1];
      if(grid[row] && grid[row][col] && !grid[row][col].isWall && !visited.has(grid[row][col])){
        s.push(grid[row][col]);
      }
    }
  }
}

function checkCycle(grid){
  let black = new Set();
  for(let i = 0 ; i < grid.length ; ++i){
    for(let j = 0 ; j < grid[i].length ; ++j){
      if(!black.has(grid[row][col] && hasCycle(grid[row][col], black))){
        return true;
      }
    }
  }
}

function hasCycle(node, blackSet){
  let curr = node;
  let s = new Stack();
  let visited = new Set();
  let gray = new Set(); //recursion stack (Active sub-graph)
  let choices = [[-1,0],[1,0],[0,1],[0,-1]];
  s.push(curr);
  while(!s.isEmpty()){
    curr = s.peek();
    if(visited.has(curr)){
      s.pop();
      gray.remove(curr);
      blackSet.add(curr);
      continue;
    }
    visited.add(curr);
    gray.add(curr);
    for(let i = 0 ; i < choices.length ; ++i){
      if(grid[row] && grid[row][col]){
        if(!visited.has(grid[row][col])){
          s.push(grid[row][col]);
        }else if(gray.has(grid[row][col])){
          return true; // cycle
        }
        // else > black (explored and its children)
      }
    }

  }

}

function topologicalSort(adjMap){ //kahn algorithm
  let inDegree = new Map();
  for(let node of adjMap.keys()){
    inDegree.put(node,adjMap.get(node).length);
  }

  let q = [];
  let visited = 0;
  for(let node of inDegree.keys()){
    if(inDegree.get(node) === 0){
      q.push(node);
    }
  }

  let curr = null;
  let sort = [];
  while(q.length){
    curr = q.shift();
    sort.push(curr);
    ++visited;
    let neighbours = adjMap.get(curr);
    for(let i = 0 ; i < neighbours.length ; ++i){
      inDegree.put(neighbours[i],inDegree.get(neighbours[i]) - 1);
      if(inDegree.get(neighbours[i]) === 0){
        q.push(neighbours[i]);
      }
    }
  }
  if(visited != inDegree.length){
    // cycle
  }
  return sort;
}
