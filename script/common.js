function getPath(parentMap,curr){
  let path = [];
  while(curr !== null){
    path.unshift(curr);
    curr = parentMap.get(curr);
  }
  return path;
}

function drawPath(counter,path){
  if(counter !== path.length){
    const curr = path[counter];
    curr.divReference.classList.add("node-path");
    setTimeout(drawPath,45,++counter,path);
  }
}
