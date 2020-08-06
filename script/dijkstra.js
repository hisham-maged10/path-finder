function dijkstra(grid, start, end,distanceMap,processed,choices,parentMap, minHeap){
  let curr = null;
  if(minHeap.length){
    minHeap.sort((a,b) => distanceMap.get(b) - distanceMap.get(a));
    curr = minHeap.pop();
    let div = curr.divReference;
    if(processed.has(curr)){
      div.classList.add("node-backtrack");
      setTimeout(dijkstra,0,grid,start,end,distanceMap,processed,choices,parentMap,minHeap)
      return;
    }
    curr.divReference.classList.add("node-current");
    setTimeout(()=> {div.classList.remove("node-current"); div.classList.add("node-check");},1000);
    processed.add(curr);
    if(curr === end){
      executeDrawPath(parentMap,curr);
      return;
    }
    for(let i = 0 ; i < choices.length ; ++i){
      let row = curr.row + choices[i][0];
      let col = curr.col + choices[i][1];
      if(grid[row] && grid[row][col] && !grid[row][col].isWall && !processed.has(grid[row][col])){
        let currDistance = distanceMap.get(curr);
        let edgeDistance = !grid[row][col].weight ? 1 : grid[row][col].weight;
        let newDistance = currDistance + edgeDistance;
        if(newDistance <= distanceMap.get(grid[row][col])){
          parentMap.set(grid[row][col],curr);
          distanceMap.set(grid[row][col],newDistance);
        }
        minHeap.push(grid[row][col]);
      }
    }
  setTimeout(dijkstra,0,grid,start,end,distanceMap,processed,choices,parentMap,minHeap)
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

function dijkstraRT(grid,start,end){
  let parentMap = new Map();
  let processed = new Set();
  let minHeap = [];
  let distanceMap = new Map();
  let choices = [[-1,0],[1,0],[0,-1],[0,1]];
  let curr = start;
  parentMap.set(curr,null);
  distanceMap.set(curr,0);
  minHeap.push(curr);
  while(minHeap.length){
    minHeap.sort((a,b) => distanceMap.get(b) - distanceMap.get(a));
    curr = minHeap.pop();
    if(processed.has(curr)){
      continue;
    }
    curr.divReference.classList.add("node-check-rt");
    if(curr === end){
      let path = getPath(parentMap,curr);
      drawPathRT(path);
      return;
    }
    processed.add(curr);
    for(let i = 0 ; i < choices.length ; ++i){
      let row = curr.row + choices[i][0];
      let col = curr.col + choices[i][1];
      if(grid[row] && grid[row][col] && !grid[row][col].isWall && !processed.has(grid[row][col])){
        let edgeDistance = !grid[row][col].weight ? 1 : grid[row][col].weight;
        let newDistance = distanceMap.get(curr) + edgeDistance;
        if(!distanceMap.has(grid[row][col]) || newDistance < distanceMap.get(grid[row][col])){
          parentMap.set(grid[row][col],curr);
          distanceMap.set(grid[row][col],newDistance);
        }
        minHeap.push(grid[row][col]);
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
