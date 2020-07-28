function bfs(grid, start, end, q, visited, choices)
{
  let size = 0;
  let curr = null;
  if(q.length !== 0){
    size = q.length;
    for(let i = 0 ; i < size ; ++i)
    {
      curr = q.shift();
      curr.divReference.classList.add("node-check");
      curr.divReference.classList.add("node-current");
      let div = curr.divReference;
      setTimeout(()=> div.classList.remove("node-current"),30);
      if(curr === end){
        console.log("Found it!");
        console.log(end);
        console.log(curr);
        clearInterval(bfsTimerID);
        return;
      }
      for(let j = 0 ; j < choices.length ; ++j){
        let row = curr.row + choices[j][0];
        let col = curr.col + choices[j][1];
        if(grid[row] && grid[row][col] && !visited.has(grid[row][col])){
          q.push(grid[row][col]);
          visited.add(grid[row][col]);
        }
      }
    }
  }else{
    console.log("NOT FOUND!");
    clearInterval(bfsTimerID);
    return;
  }
}
