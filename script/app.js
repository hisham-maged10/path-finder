
document.querySelector("#dfs").addEventListener("click",executeDFS);
document.querySelector("#bfs").addEventListener("click",executeBFS);
document.querySelector("#dijkstra").addEventListener("click",executeDijkstra);
// document.querySelector("#stop").addEventListener("click",() => clearInterval(dfsTimerID));

function executeDFS(){
  if(!nodes || !startNode || !endNode){
    console.log("one of the inputs is empty");
    return;
  }
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
  let curr = null;
  let q = [];
  q.push(startNode);
  console.log(q);
  let parentMap = new Map();
  parentMap.set(startNode, null);
  let choices = [[-1,0],[1,0],[0,1],[0,-1]];
  setTimeout(bfs,0,nodes,startNode,endNode,q,parentMap,choices);

}

function executeDijkstra(){
  if(!nodes || !startNode || !endNode)
  {
    console.log("Empty input!");
    return;
  }

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
  let points = [];
  points.push(curr);
  setTimeout(dijkstra,0,nodes,startNode,endNode,distanceMap,processed,choices,parentMap,points)
}

function executeDrawPath(parentMap,endNode){
  console.log("Entered here")
  let path = getPath(parentMap,endNode);
  setTimeout(drawPath,0,0,path);
}
