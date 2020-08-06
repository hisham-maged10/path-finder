function dijkstra(grid, start, end,distanceMap,processed,choices,parentMap, minHeap){
  let curr = null;
  // if(minHeap.size()){
  if(minHeap.length){
    // points.sort((a,b) => distanceMap.get(b) - distanceMap.get(a));
    // curr = points.pop();
    // debugger;
    // curr = minHeap.remove();
    minHeap.sort((a,b) => distanceMap.get(b) - distanceMap.get(a));
    curr = minHeap.pop();
    // console.log(minHeap.size())
    // debugger;
    let div = curr.divReference;
    if(processed.has(curr)){
      div.classList.add("node-backtrack");
      setTimeout(dijkstra,0,grid,start,end,distanceMap,processed,choices,parentMap,minHeap)
      return;
    }
    curr.divReference.classList.add("node-current");
    // let div = curr.divReference;
    setTimeout(()=> {div.classList.remove("node-current"); div.classList.add("node-check");},1000);
    // div.classList.add("node-current");
    // setTimeout(() => {div.classList.remove("node-current"); div.classList.add("node-check");},500);
    processed.add(curr);
    if(curr === end){
      console.log("FOUND IT");
      // console.log(points.length);
      console.log(curr);
      console.log(end);
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
        // console.log(newDistance);
        // console.log(distanceMap.get(grid[row][col]));
        if(newDistance <= distanceMap.get(grid[row][col])){
          parentMap.set(grid[row][col],curr);
          distanceMap.set(grid[row][col],newDistance);
          // console.log(parentMap);
        }
        let childDiv = grid[row][col].divReference;
        // childDiv.classList.add("node-child");
        // setTimeout(() => childDiv.classList.remove("node-child"), 30);
        minHeap.push(grid[row][col]);
        // minHeap.insert(grid[row][col]);
        // debugger
      }
    }
  setTimeout(dijkstra,0,grid,start,end,distanceMap,processed,choices,parentMap,minHeap)
  }else{
    document.querySelector("#clear").disabled = false;
    document.querySelector("#clear-path").disabled = false;
    document.querySelector("#size-slider").disabled = false;
    let toastTriggerEl = document.getElementById('fail-toast')
    let toast = new mdb.Toast(toastTriggerEl)
    toast.show()
    return;
  }
}
