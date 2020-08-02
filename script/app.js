document.querySelector("#dfs").addEventListener("click",executeDFS);
document.querySelector("#bfs").addEventListener("click",executeBFS);
document.querySelector("#dijkstra").addEventListener("click",executeDijkstra);
document.querySelector("#astar").addEventListener("click",executeAstar);
document.querySelector("#bidirectional-astar").addEventListener("click",executeBidrectionalAStar);
document.querySelector("#bidirectional-bfs").addEventListener("click",executeBidrectionalBFS);
document.querySelector("#bidirectional-greedy-bfs").addEventListener("click",executeBidrectionalGreedyBFS);
document.querySelector("#greedybest").addEventListener("click",executeGreedyBestFirst);
document.querySelector("#clear").addEventListener("click",clearGrid);
document.querySelector("#maze").addEventListener("click",() => generateMazePrimRT(nodes));
document.querySelector("#maze-recursive-backtracker").addEventListener("click",() => recursiveBacktrackerRT(nodes));
document.querySelector("#maze-animation-recursive-backtracker").addEventListener("click",executeRecursiveBacktrackerMazeGeneration);
document.querySelector("#maze-animation").addEventListener("click",executePrimMazeGeneration);
// document.querySelector("#stop").addEventListener("click",() => clearInterval(dfsTimerID));
let status = 0;
let running = "";
function executePrimMazeGeneration(){
  clearGrid(0,false);
  for(let i = 0 ; i < nodes.length ; ++i){
    for(let j = 0 ; j < nodes[i].length ; ++j){
      nodes[i][j].divReference.classList.add("node-wall");
      nodes[i][j].isWall = true;
    }
  }
  // let choices = [[-1,0],[0,1],[1,0],[0,-1]];
  let choices = [[-2,0],[0,2],[2,0],[0,-2]];
  // picking random cell and making it a passage
  let cell = nodes[Math.floor(Math.random() * nodes.length)][Math.floor(Math.random() * nodes[0].length)];
  cell.isWall = false;
  cell.divReference.classList.remove("node-wall");
  // compute frontier cells of picked random cell
  let frontierList = [];
  computeFrontierCells(nodes,cell,frontierList,choices);
  setTimeout(generateMazePrim,0,nodes,frontierList,choices);
}

function executeRecursiveBacktrackerMazeGeneration(){
  clearGrid(0,false);
  for(let i = 0 ; i < nodes.length ; ++i){
    for(let j = 0 ; j < nodes[i].length ; ++j){
      nodes[i][j].divReference.classList.add("node-wall");
      nodes[i][j].isWall = true;
    }
  }

  let cell = nodes[Math.floor(Math.random() * nodes.length)][Math.floor(Math.random() * nodes[0].length)];
  let s = [];
  cell.isWall = false;
  cell.divReference.classList.remove("node-wall");
  let choices = [[-2,0],[0,2],[2,0],[0,-2]];
  let neighbours = computeFrontierCellsRBT(nodes,cell,choices);
  let rnd = Math.floor(Math.random () * neighbours.length);
  s.push(neighbours[rnd]);
  setTimeout(recursiveBacktracker,0,nodes,s,choices);
}
function executeDFS(){
  if(!nodes || !startNode || !endNode){
    console.log("one of the inputs is empty");
    return;
  }
  if(status === 1){
    clearGrid();
  }
  status = 1;
  running = "dfs";
  let s = [];
  let parentMap = new Map();
  s.push(startNode);
  let choices = [[-1,0],[1,0],[0,1],[0,-1]];
  setTimeout(dfs,0,nodes,startNode,endNode,s,parentMap,choices);

}

function executeBFS(){
  if(!nodes || !startNode || !endNode)
  {
    console.log("Empty input");
    return;
  }
  if(status === 1){
    clearGrid();
  }
  status = 1;
  running = "bfs";
  let curr = null;
  let q = [];
  q.push(startNode);
  console.log(q);
  let parentMap = new Map();
  parentMap.set(startNode, null);
  let choices = [[-1,0],[1,0],[0,1],[0,-1]];
  setTimeout(bfs,0,nodes,startNode,endNode,q,parentMap,choices);

}

function executeAstar(){
  if(!nodes || !startNode || !endNode){
    console.log("Invalid input!");
    return;
  }
  if(status === 1){
    clearGrid();
  }
  status = 1;
  running = "astar";
  let parentMap = new Map();
  let distanceMap = new Map();
  let hMap = new Map();
  let processed = new Set();
  let minHeap = [];
  let choices = [[-1,0],[1,0],[0,1],[0,-1]];
  let curr = startNode;
  minHeap.push(curr);
  let h = 0;
  for(let i = 0 ; i < nodes.length ; ++i){
    for(let j = 0 ; j < nodes[i].length ; ++j){
      distanceMap.set(nodes[i][j],Infinity);
      h = Math.abs(nodes[i][j].row - endNode.row) + Math.abs(nodes[i][j].col - endNode.col);
      hMap.set(nodes[i][j],h);
    }
  }
  distanceMap.set(curr, 0);
  parentMap.set(curr, null);
  setTimeout(astar,0,nodes,startNode,endNode,parentMap,distanceMap,hMap,processed,minHeap,choices);
}

function executeDijkstra(){
  if(!nodes || !startNode || !endNode)
  {
    console.log("Empty input!");
    return;
  }
  if(status === 1){
    clearGrid();
  }
  status = 1;
  running = "dijkstra";
  let curr = startNode;
  let distanceMap = new Map();
  let processed = new Set();
  let choices = [[1,0],[-1,0],[0,-1],[0,1]];
  let parentMap = new Map();
  parentMap.set(curr,null);
  for(let i = 0 ; i < nodes.length ; ++i){
    for(let j = 0 ; j < nodes[i].length ; ++j){
      distanceMap.set(nodes[i][j],Infinity);
    }
  }
  distanceMap.set(curr,0);
  // let minHeap = new MinHeap();
  let minHeap = [];
  // minHeap.insert(curr);
  minHeap.push(curr);
  setTimeout(dijkstra,0,nodes,startNode,endNode,distanceMap,processed,choices,parentMap,minHeap)
}

function executeBidrectionalAStar(){
  // bidirectionalRT(nodes,startNode,endNode);
  // return;
  if(!nodes || !startNode || !endNode)
  {
    console.log("Empty input!");
    return;
  }
  if(status === 1){
    clearGrid();
  }
  status = 1;
  running = "bidirectional-astar";

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
  let forwardCurr = startNode;
  let backwardCurr = endNode;
  let choices = [[-1,0],[1,0],[0,-1],[0,1]];
  for(let i = 0 ; i < nodes.length ; ++i){
    for(let j = 0 ; j < nodes[i].length ; ++j){
      forwardDistanceMap.set(nodes[i][j],Infinity);
      backwardDistanceMap.set(nodes[i][j],Infinity);
      forwardHeuristic.set(nodes[i][j], Math.abs(nodes[i][j].row - endNode.row) + Math.abs(nodes[i][j].col - endNode.col));
      backwardHeuristic.set(nodes[i][j], Math.abs(nodes[i][j].row - startNode.row) + Math.abs(nodes[i][j].col - startNode.col));
    }
  }
  forwardDistanceMap.set(forwardCurr,0);
  backwardDistanceMap.set(backwardCurr,0);
  forwardParentMap.set(forwardCurr, null);
  backwardParentMap.set(backwardCurr, null);
  forwardMinHeap.push(forwardCurr);
  backwardMinHeap.push(backwardCurr);

  setTimeout(bidirectionalAStar,0,nodes, startNode, endNode, forwardDistanceMap, backwardDistanceMap, forwardProcessed, backwardProcessed, forwardHeuristic, backwardHeuristic,
forwardParentMap, backwardParentMap, forwardMinHeap, backwardMinHeap, forwardCurr, backwardCurr, choices);
}

function executeBidrectionalBFS(){
  if(!nodes || !startNode || !endNode)
  {
    console.log("Empty input!");
    return;
  }
  if(status === 1){
    clearGrid();
  }
  status = 1;
  running = "bidirectional-bfs";

  let forwardParentMap = new Map();
  let backwardParentMap = new Map();
  let forwardQueue = [];
  let backwardQueue = [];
  let forwardCurr = startNode;
  let backwardCurr = endNode;
  let choices = [[-1,0],[1,0],[0,-1],[0,1]];
  forwardParentMap.set(forwardCurr, null);
  backwardParentMap.set(backwardCurr, null);
  forwardQueue.push(forwardCurr);
  backwardQueue.push(backwardCurr);

setTimeout(bidirectionalBFS,0,nodes, startNode, endNode, forwardQueue, backwardQueue, forwardParentMap, backwardParentMap, forwardCurr, backwardCurr, choices);
}

function executeBidrectionalGreedyBFS(){
  if(!nodes || !startNode || !endNode)
  {
    console.log("Empty input!");
    return;
  }
  if(status === 1){
    clearGrid();
  }
  status = 1;
  running = "bidirectional-greedy-bfs";

  let forwardParentMap = new Map();
  let backwardParentMap = new Map();
  let forwardMinHeap = [];
  let backwardMinHeap = [];
  let forwardCurr = startNode;
  let backwardCurr = endNode;
  let forwardHeuristic = new Map();
  let backwardHeuristic = new Map();
  let choices = [[-1,0],[1,0],[0,-1],[0,1]];
  for(let i = 0 ; i < nodes.length ; ++i){
    for(let j = 0 ; j < nodes[i].length ; ++j){
      forwardHeuristic.set(nodes[i][j], Math.abs(nodes[i][j].row - endNode.row) + Math.abs(nodes[i][j].col - endNode.col));
      backwardHeuristic.set(nodes[i][j], Math.abs(nodes[i][j].row - startNode.row) + Math.abs(nodes[i][j].col - startNode.col));
    }
  }
  forwardParentMap.set(forwardCurr, null);
  backwardParentMap.set(backwardCurr, null);
  forwardMinHeap.push(forwardCurr);
  backwardMinHeap.push(backwardCurr);

setTimeout(bidirectionalGreedyBFS,0,nodes, startNode, endNode, forwardMinHeap, backwardMinHeap,forwardParentMap, backwardParentMap, forwardHeuristic, backwardHeuristic, forwardCurr, backwardCurr, choices);
}
function executeGreedyBestFirst(){
  if(!nodes || !startNode || !endNode)
  {
    console.log("Empty input!");
    return;
  }
  if(status === 1){
    clearGrid();
  }
  status = 1;
  running = "greedy-best";
  let heuristicMap = new Map();
  let minHeap = [];
  let parentMap = new Map();
  let curr = startNode;
  let choices = [[-1,0],[1,0],[0,1],[0,-1]];
  for(let i = 0 ; i < nodes.length ; ++i){
    for(let j = 0 ; j < nodes[i].length ; ++j){
      heuristicMap.set(nodes[i][j], Math.abs(nodes[i][j].row - endNode.row) + Math.abs(nodes[i][j].col - endNode.col));
    }
  }
  parentMap.set(curr, null);
  minHeap.push(curr);

setTimeout(greedyBest,0,nodes, startNode, endNode, heuristicMap,minHeap,parentMap,choices);
}

function executeDrawPath(parentMap,endNode){
  console.log("Entered here")
  let path = getPath(parentMap,endNode);
  setTimeout(drawPath,0,0,path);
}

function clearGrid(statusVal = 0, keep = true){
  if(!keep){
    grid.addEventListener("click",divClicked);
  }
  for(let i = 0 ; i < nodes.length ; ++i){
    for(let j = 0 ; j < nodes[i].length ; ++j){
      nodes[i][j].divReference.className = "node";
        if(nodes[i][j].isStart){
          if(keep){
            nodes[i][j].divReference.classList.add("node-start");
          }else{
            startNode = null;
            nodes[i][j].isStart = false;
          }
        }
        if(nodes[i][j].isEnd){
          if(keep){
            nodes[i][j].divReference.classList.add("node-end");
          }else{
            endNode = null;
            nodes[i][j].isEnd = false;
          }
        }
        if(nodes[i][j].isWall){
          if(keep){
            nodes[i][j].divReference.classList.add("node-wall");
          }else{
            nodes[i][j].isWall = false;
          }
        }
        if(nodes[i][j].weight){
          if(keep){
            nodes[i][j].divReference.classList.add(`node-strong-${nodes[i][j].weight}`);
          }else{
            nodes[i][j].weight = 0;
          }
        }
      }
    }
  status = statusVal;
  running = "";
}
