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
    curr.divReference.classList.add("node-current");
    setTimeout(()=> {div.classList.remove("node-current"); div.classList.add("node-check");},1000);
    parentMap.set(curr,prev);
    if(curr === end)
    {
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
      }
    }
    setTimeout(dfs,10,grid,start,end,s,parentMap,choices,curr);
  }else{
    document.querySelector("#clear").disabled = false;
    document.querySelector("#clear-path").disabled = false;
    document.querySelector("#size-slider").disabled = false;
  document.querySelector("#path-finding-grp-btn").disabled = false;
  document.querySelector("#maze-generation-grp-btn").disabled = false;
    let toastTriggerEl = document.getElementById('fail-toast')
    let toast = new mdb.Toast(toastTriggerEl)
    toast.show()
    return;
  }
}

function dfsRT(grid, start, end){
  let curr = start;
  let s = [];
  let parentMap = new Map();
  parentMap.set(curr,null);
  let choices = [[-1,0],[1,0],[0,1],[0,-1]];
  s.push(curr);
  let visited = new Set();
  while(s.length){
    curr = s.pop();
    if(visited.has(curr)){
      continue;
    }
    if(curr === end){
      let path = getPath(parentMap,curr);
      drawPathRT(path);
      return;
    }
    curr.divReference.classList.add("node-check-rt")
    visited.add(curr);
    for(let i = 0 ; i < choices.length ; ++i){
      let row = curr.row + choices[i][0];
      let col = curr.col + choices[i][1];
      if(grid[row] && grid[row][col] && !grid[row][col].isWall && !visited.has(grid[row][col])){
        s.push(grid[row][col]);
        parentMap.set(grid[row][col],curr);
      }
    }
  }
    document.querySelector("#clear").disabled = false;
    document.querySelector("#clear-path").disabled = false;
    document.querySelector("#size-slider").disabled = false;
  document.querySelector("#path-finding-grp-btn").disabled = false;
  document.querySelector("#maze-generation-grp-btn").disabled = false;
    let toastTriggerEl = document.getElementById('fail-toast')
    let toast = new mdb.Toast(toastTriggerEl)
    toast.show()
    return;
}
