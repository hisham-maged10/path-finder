function getPath(parentMap,curr){
  let path = [];
  while(curr !== null){
    // console.log(curr);
    // console.log(path);
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

function drawPathRT(path){
  let counter = 0;
  while(counter !== path.length){
    const curr = path[counter];
    curr.divReference.classList.add("node-path");
    ++counter;
  }
}
