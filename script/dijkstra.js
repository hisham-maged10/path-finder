function dijkstra(grid, start, end,distanceMap,processed,choices,parentMap, points){
  let curr = null;
  if(points.length){
    points.sort((a,b) => distanceMap.get(b) - distanceMap.get(a));
    curr = points.pop();
    let div = curr.divReference;
    div.classList.add("node-check");
    div.classList.add("node-current");
    setTimeout(() => div.classList.remove("node-current"),30);
    if(processed.has(curr)){
      setTimeout(dijkstra,30,grid,start,end,distanceMap,processed,choices,parentMap,points)
      return;
    }
    processed.add(curr);
    if(curr === end){
      console.log("FOUND IT");
      console.log(points.length);
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
        let edgeDistance = grid[row][col].weight;
        let newDistance = currDistance + edgeDistance;
        // console.log(newDistance);
        // console.log(distanceMap.get(grid[row][col]));
        if(newDistance < distanceMap.get(grid[row][col])){
          parentMap.set(grid[row][col],curr);
          distanceMap.set(grid[row][col],newDistance);
          // console.log(parentMap);
        }
        let childDiv = grid[row][col].divReference;
        childDiv.classList.add("node-child");
        setTimeout(() => childDiv.classList.remove("node-child"), 30);
        points.push(grid[row][col]);
      }
    }
  }else{
    console.log("Not FOUND!");
    return;
  }
  setTimeout(dijkstra,30,grid,start,end,distanceMap,processed,choices,parentMap,points)

}
