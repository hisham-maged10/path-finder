function dfs(grid,start,end,s,parentMap,choices,prev = null)
{
  if(s.length){
    curr = s.pop();
    if(curr.isWall){
      setTimeout(dfs,15,grid,start,end,s,parentMap,choices,curr);
      return;
    }
    let div = curr.divReference;
    div.classList.add("node-current");
    setTimeout(()=> div.classList.remove("node-current"),30);
    if(parentMap.has(curr)){
    setTimeout(dfs,15,grid,start,end,s,parentMap,choices,curr);
      return;
    }
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
        childDiv.classList.add("node-child");
        setTimeout(() => childDiv.classList.remove("node-child"), 30);
      }
    }
  }else{
    console.log("NOT FOUND!");
    return;
  }
  setTimeout(dfs,30,grid,start,end,s,parentMap,choices,curr);
}
