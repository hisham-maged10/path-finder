function dfs(grid,start,end,s,visited,choices)
{
  if(s.length){
    curr = s.pop();
    let div = curr.divReference;
    div.classList.add("node-current");
    setTimeout(()=> div.classList.remove("node-current"),15);
    if(visited.has(curr)){
    setTimeout(dfs,15,grid,start,end,s,visited,choices);
      return;
    }
    curr.divReference.classList.add("node-check");
    if(curr === end)
    {
      console.log("FOUND IT!");
      console.log(start.divReference);
      console.log(end.divReference);
      console.log(curr.divReference);
      return;
    }
    visited.add(curr);
    for(let i = 0 ; i < choices.length ; ++i)
    {
      let row = curr.row + choices[i][0];
      let col = curr.col + choices[i][1];
      if(grid[row] && grid[row][col] && !visited.has(grid[row][col])){
        s.push(grid[row][col]);
      }
    }
  }else{
    console.log("NOT FOUND!");
    return;
  }
  setTimeout(dfs,15,grid,start,end,s,visited,choices);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
