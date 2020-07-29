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
      curr.divReference.classList.add("node-check");
      curr.divReference.classList.add("node-current");
      let div = curr.divReference;
      setTimeout(()=> div.classList.remove("node-current"),30);
      if(curr === end){
        console.log("Found it!");
        console.log(end);
        console.log(curr);
        console.log(parentMap);
        executeDrawPath(parentMap,curr);
        return;
      }
      for(let j = 0 ; j < choices.length ; ++j){
        let row = curr.row + choices[j][0];
        let col = curr.col + choices[j][1];
        if(grid[row] && grid[row][col] && !grid[row][col].isWall && !parentMap.has(grid[row][col])){
          q.push(grid[row][col]);
          let childDiv = grid[row][col].divReference;
          childDiv.classList.add("node-child");
          setTimeout(() => childDiv.classList.remove("node-child"), 30);
          parentMap.set(grid[row][col],curr);
        }
      }
    }
  }else{
    console.log("NOT FOUND!");
    return;
  }
  setTimeout(bfs,30,nodes,startNode,endNode,q,parentMap,choices);
}
