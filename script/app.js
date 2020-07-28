
document.querySelector("#dfs").addEventListener("click",executeDFS);
document.querySelector("#bfs").addEventListener("click",executeBFS);
document.querySelector("#stop").addEventListener("click",() => clearInterval(dfsTimerID));

function executeDFS(){
  if(!nodes || !startNode || !endNode){
    console.log("one of the inputs is empty");
    return;
  }
  let s = [];
  let parentMap = new Map();
  s.push(startNode);
  let choices = [[-1,0],[1,0],[0,1],[0,-1]];
  setTimeout(dfs,15,nodes,startNode,endNode,s,parentMap,choices);

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
  let parentMap = new Map();
  parentMap.set(startNode, null);
  let choices = [[-1,0],[1,0],[0,1],[0,-1]];
  setTimeout(bfs,30,nodes,startNode,endNode,q,parentMap,choices);

}

function executeDrawPath(parentMap,endNode){
  console.log("Entered here")
  let path = getPath(parentMap,endNode);
  setTimeout(drawPath,15,0,path);
}
