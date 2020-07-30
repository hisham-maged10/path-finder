document.querySelector("#dfs").addEventListener("click",executeDFS);
document.querySelector("#bfs").addEventListener("click",executeBFS);
document.querySelector("#dijkstra").addEventListener("click",executeDijkstra);
document.querySelector("#astar").addEventListener("click",executeAstar);
document.querySelector("#clear").addEventListener("click",clearGrid);
// document.querySelector("#stop").addEventListener("click",() => clearInterval(dfsTimerID));
let status = 0;
let running = "";
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

function executeDrawPath(parentMap,endNode){
  console.log("Entered here")
  let path = getPath(parentMap,endNode);
  setTimeout(drawPath,0,0,path);
}

function clearGrid(statusVal = 0){
  for(let i = 0 ; i < nodes.length ; ++i){
    for(let j = 0 ; j < nodes[i].length ; ++j){
      nodes[i][j].divReference.className = "node";
      if(nodes[i][j].isStart){
        nodes[i][j].divReference.classList.add("node-start");
      }
      if(nodes[i][j].isEnd){
        nodes[i][j].divReference.classList.add("node-end");
      }
      if(nodes[i][j].isWall){
        nodes[i][j].divReference.classList.add("node-wall");
      }
      if(nodes[i][j].weight){
        nodes[i][j].divReference.classList.add(`node-strong-${nodes[i][j].weight}`);
      }
    }
  }
  status = statusVal;
  running = "";
}
