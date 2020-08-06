function bfs(grid, start, end, q, parentMap, choices)
{
  let size = 0;
  let curr = null;
  if(q.length){
    size = q.length;
    for(let i = 0 ; i < size ; ++i)
    {
      curr = q.shift();
      if(curr.isWall){
        continue;
      }
      curr.divReference.classList.add("node-current");
      let div = curr.divReference;
      setTimeout(()=> {div.classList.remove("node-current"); div.classList.add("node-check");},1000);
      // curr.divReference.classList.add("node-check");
      if(curr === end){
        executeDrawPath(parentMap,curr);
        return;
      }
      for(let j = 0 ; j < choices.length ; ++j){
        let row = curr.row + choices[j][0];
        let col = curr.col + choices[j][1];
        if(grid[row] && grid[row][col] && !grid[row][col].isWall && !parentMap.has(grid[row][col])){
          q.push(grid[row][col]);
          let childDiv = grid[row][col].divReference;
          // childDiv.classList.add("node-child");
          // setTimeout(() => childDiv.classList.remove("node-child"), 10);
          parentMap.set(grid[row][col],curr);
        }
      }
    }
  setTimeout(bfs,30,nodes,startNode,endNode,q,parentMap,choices);
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

function bfsRT(grid, start, end)
{
  if(!grid || !start || !end){
    return;
  }
  let curr = start;
  let q = [];
  let parentMap = new Map();
  parentMap.set(curr,null);
  q.push(curr);
  let choices = [[-1,0],[1,0],[0,1],[0,-1]];
  let size = 0;
  while(q.length){
    size = q.length;
    for(let i = 0 ; i < size ; ++i){
      curr = q.shift();
      curr.divReference.classList.add("node-check-rt")
      if(curr === end){
        path = getPath(parentMap,curr);
        drawPathRT(path);
        return;
      }
      for(let j = 0 ; j < choices.length ; ++j){
        let row = curr.row + choices[j][0];
        let col = curr.col + choices[j][1];
        if(grid[row] && grid[row][col] && !grid[row][col].isWall && !parentMap.has(grid[row][col])){
          q.push(grid[row][col]);
          parentMap.set(grid[row][col],curr);
        }
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
