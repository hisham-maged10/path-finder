function getPath(parentMap,curr){
  let path = [];
  while(curr !== null){
    console.log("Running");
    path.unshift(curr);
    curr = parentMap.get(curr);
  }
  return path;
}

function drawPath(counter,path){
  if(counter !== path.length){
    const curr = path[counter];
    curr.divReference.classList.add("node-path");
    setTimeout(drawPath,15,++counter,path);
  }
}
