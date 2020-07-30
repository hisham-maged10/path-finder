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
    div.classList.add("node-current");
    setTimeout(()=> div.classList.remove("node-current"),10);
    curr.divReference.classList.add("node-check");
    parentMap.set(curr,prev);
    if(curr === end)
    {
      console.log("FOUND IT!");
      console.log(start.divReference);
      console.log(end.divReference);
      console.log(curr.divReference);
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
        // childDiv.classList.add("node-child");
        // setTimeout(() => childDiv.classList.remove("node-child"), 10);
      }
    }
  }else{
    console.log("NOT FOUND!");
    return;
  }
  setTimeout(dfs,10,grid,start,end,s,parentMap,choices,curr);
}
