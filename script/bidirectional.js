function bidirectionalAStar(grid, start, end, forwardDistanceMap, backwardDistanceMap, forwardProcessed, backwardProcessed, forwardHeuristic, backwardHeuristic,
forwardParentMap, backwardParentMap, forwardMinHeap, backwardMinHeap, forwardCurr, backwardCurr, choices){

  if(forwardMinHeap.length || backwardMinHeap.length){
    if(checkIntersectionAStar(forwardProcessed, backwardCurr, forwardParentMap, backwardParentMap)){ return;}
    if(checkIntersectionAStar(backwardProcessed, forwardCurr, backwardParentMap, forwardParentMap)){ return;}
    if(forwardMinHeap.length){
      forwardCurr = doAStar(forwardMinHeap,forwardDistanceMap,forwardHeuristic,forwardProcessed,choices,grid,forwardParentMap);
    }
    if(backwardMinHeap.length){
      backwardCurr = doAStar(backwardMinHeap,backwardDistanceMap,backwardHeuristic,backwardProcessed,choices,grid,backwardParentMap);
    }

setTimeout(bidirectionalAStar,10,grid, start, end, forwardDistanceMap, backwardDistanceMap, forwardProcessed, backwardProcessed, forwardHeuristic, backwardHeuristic,
forwardParentMap, backwardParentMap, forwardMinHeap, backwardMinHeap, forwardCurr, backwardCurr, choices);
  }else{
    console.log("not found");
    return;
  }
}
function bidirectionalBFS(grid, start, end, forwardQueue, backwardQueue, forwardParentMap, backwardParentMap, forwardCurr, backwardCurr, choices){

  if(forwardQueue.length || backwardQueue.length){
    if(checkIntersectionBFS(forwardParentMap, backwardCurr, backwardParentMap)){ return;}
    if(checkIntersectionBFS(backwardParentMap, forwardCurr, forwardParentMap)){ return;}
    if(forwardQueue.length){
      forwardCurr = doBFS(forwardQueue,choices,grid,forwardParentMap);
    }
    if(backwardQueue.length){
      backwardCurr = doBFS(backwardQueue,choices,grid,backwardParentMap);
    }

setTimeout(bidirectionalBFS,10,grid, start, end, forwardQueue, backwardQueue,forwardParentMap, backwardParentMap, forwardCurr, backwardCurr, choices);
  }else{
    console.log("not found");
    return;
  }
}
function doBFS(q,choices,grid,parentMap){
  let curr = q.shift();
  let div = curr.divReference;
  div.classList.add("node-current");
  setTimeout(() => {div.classList.remove("node-current"); div.classList.add("node-check")},1000);
  for(let i = 0 ; i < choices.length ; ++i){
    let row = curr.row + choices[i][0];
    let col = curr.col + choices[i][1];
    if(grid[row] && grid[row][col] && !grid[row][col].isWall && !parentMap.has(grid[row][col])){
      q.push(grid[row][col]);
      parentMap.set(grid[row][col], curr);
    }
  }
  return curr;
}
function doAStar(minHeap, distanceMap, heursticMap, processed, choices, grid, parentMap){
  minHeap.sort((a,b) => (distanceMap.get(b) + heursticMap.get(b)) - (distanceMap.get(a) + heursticMap.get(a)));
  let curr = minHeap.pop();
  let div = curr.divReference;
  if(processed.has(curr)){
    div.classList.add("node-backtrack");
    return curr;
  }
  div.classList.add("node-current");
  setTimeout(() => {div.classList.remove("node-current"); div.classList.add("node-check")});
  processed.add(curr);
  for(let i = 0 ; i < choices.length ; ++i){
    let row = curr.row + choices[i][0];
    let col = curr.col + choices[i][1];
    if(grid[row] && grid[row][col] && !grid[row][col].isWall && !processed.has(grid[row][col])){
      let edgeDistance = !grid[row][col].weight ? 1 : grid[row][col].weight;
      let newDistance = distanceMap.get(curr) + edgeDistance;
      if(newDistance < distanceMap.get(grid[row][col])){
        parentMap.set(grid[row][col], curr);
        distanceMap.set(grid[row][col], newDistance);
      }
      minHeap.push(grid[row][col]);
    }
  }

  return curr;
}
function checkIntersectionBFS(parentMap, curr, otherParentMap){
  if(parentMap.has(curr)){
    console.log("intersection");
    curr.divReference.classList.add("node-intersection");
    executeDrawPath(parentMap, curr);
    executeDrawPath(otherParentMap, curr);
    return true;
  }
  return false;
}

function checkIntersectionAStar(processed, curr, currentParentMap, otherParentMap){
  if(processed.has(curr)){
    console.log("intersection");
    curr.divReference.classList.add("node-intersection");
    executeDrawPath(currentParentMap, curr);
    executeDrawPath(otherParentMap, curr);
    return true;
  }
  return false;
}
function bidirectionalRT(grid, start, end){
  if(!grid || !start || !end){
    console.log("invalid input");
    return;
  }

  let forwardDistanceMap = new Map();
  let backwardDistanceMap = new Map();
  let forwardProcessed = new Set();
  let backwardProcessed = new Set();
  let forwardHeuristic = new Map();
  let backwardHeuristic = new Map();
  let forwardParentMap = new Map();
  let backwardParentMap = new Map();
  let forwardMinHeap = [];
  let backwardMinHeap = [];
  let forwardCurr = start;
  let backwardCurr = end;
  let choices = [[-1,0],[1,0],[0,-1],[0,1]];
  for(let i = 0 ; i < grid.length ; ++i){
    for(let j = 0 ; j < grid[i].length ; ++j){
      forwardDistanceMap.set(grid[i][j],Infinity);
      backwardDistanceMap.set(grid[i][j],Infinity);
      forwardHeuristic.set(grid[i][j], Math.abs(grid[i][j].row - end.row) + Math.abs(grid[i][j].col - end.col));
      backwardHeuristic.set(grid[i][j], Math.abs(grid[i][j].row - start.row) + Math.abs(grid[i][j].col - start.col));
    }
  }
  forwardDistanceMap.set(forwardCurr,0);
  backwardDistanceMap.set(backwardCurr,0);
  forwardParentMap.set(forwardCurr, null);
  backwardParentMap.set(backwardCurr, null);
  forwardMinHeap.push(forwardCurr);
  backwardMinHeap.push(backwardCurr);

  while(forwardMinHeap.length || backwardMinHeap.length){
    if(checkIntersection(forwardProcessed, backwardCurr, forwardParentMap, backwardParentMap)){ return;}
    if(checkIntersection(backwardProcessed, forwardCurr, backwardParentMap, forwardParentMap)){ return;}
    if(forwardMinHeap.length){
      forwardCurr = doAStarRT(forwardMinHeap,forwardDistanceMap,forwardHeuristic,forwardProcessed,choices,grid,forwardParentMap);
      console.log(forwardCurr);
    }
    if(backwardMinHeap.length){
      backwardCurr = doAStarRT(backwardMinHeap,backwardDistanceMap,backwardHeuristic,backwardProcessed,choices,grid,backwardParentMap);
      console.log(backwardCurr);
    }
  }
  console.log("finished");
}
function doAStarRT(minHeap, distanceMap, heursticMap, processed, choices, grid, parentMap){
  minHeap.sort((a,b) => (distanceMap.get(b) + heursticMap.get(b)) - (distanceMap.get(a) + heursticMap.get(a)));
  let curr = minHeap.pop();
  if(processed.has(curr)){
    return curr;
  }
  curr.divReference.classList.add("node-check-rt");
  processed.add(curr);
  for(let i = 0 ; i < choices.length ; ++i){
    let row = curr.row + choices[i][0];
    let col = curr.col + choices[i][1];
    if(grid[row] && grid[row][col] && !grid[row][col].isWall && !processed.has(grid[row][col])){
      let edgeDistance = !grid[row][col].weight ? 1 : grid[row][col].weight;
      let newDistance = distanceMap.get(curr) + edgeDistance;
      if(newDistance < distanceMap.get(grid[row][col])){
        parentMap.set(grid[row][col], curr);
        distanceMap.set(grid[row][col], newDistance);
      }
      minHeap.push(grid[row][col]);
    }
  }

  return curr;
}
