
document.querySelector("#dfs").addEventListener("click",executeDFS);
document.querySelector("#bfs").addEventListener("click",executeBFS);

function executeDFS(){
  if(!nodes || !startNode || !endNode){
    console.log("one of the inputs is empty");
    return;
  }
  let s = [];
  let visited = new Set();
  let curr = null;
  s.push(startNode);
  let choices = [[-1,0],[1,0],[0,1],[0,-1]];
  dfsTimerID = setInterval(dfs,15,nodes,startNode,endNode,s,visited,curr,choices);

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
  let visited = new Set();
  visited.add(startNode);
  let choices = [[-1,0],[1,0],[0,1],[0,-1]];
  bfsTimerID = setInterval(bfs,30,nodes,startNode,endNode,q,visited,choices);

}
