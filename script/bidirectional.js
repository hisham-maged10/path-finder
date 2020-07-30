function bidirectional(grid, start, end,sParentMap,eParentMap,sMinHeap,eMinHeap,sProcessed,eProcessed,sDistanceMap,eDistanceMap,sHMap,eHMap,choices){
  let startSkip = false;
  let endSkip = false;
  if(sMinHeap.length || eMinHeap.length){
    startSkip = false;
    endSkip = false;
    if(sMinHeap.length){
      sMinHeap.sort((a,b) => (sDistanceMap.get(b) + sHMap.get(b)) - (sDistanceMap.get(a) + sHMap.get(a)));
      sCurr = sMinHeap.pop();
      if(sProcessed.has(sCurr)){
        startSkip = true;
        sCurr.divReference.classList.add("node-backtrack");
        let intersect = null;
        for(let x of sProcessed) if(eProcessed.has(x)) intersect = x;
        if(intersect){
          console.log("Found intersection!");
          intersect.divReference.classList.add("node-intersection");
          console.log(eParentMap.get(intersect));
          console.log(sParentMap.get(intersect));
          executeDrawPath(eParentMap,intersect);
          executeDrawPath(sParentMap,intersect);
          return ;
        }
      }
      if(!startSkip){
        let div = sCurr.divReference;
        div.classList.add("node-current");
        // let div = curr.divReference;
        setTimeout(()=> {div.classList.remove("node-current"); div.classList.add("node-check");},1000);
        // sCurr.divReference.classList.add("node-check");
        // if(sCurr === end){
        //   console.log("Found it from start");
        //   return;
        // }
        sProcessed.add(sCurr);
        let intersect = null;
        for(let x of sProcessed) if(eProcessed.has(x)) intersect = x;
        if(intersect){
          console.log("Found intersection!");
          intersect.divReference.classList.add("node-intersection");
          console.log(eParentMap.get(intersect));
          console.log(sParentMap.get(intersect));
          executeDrawPath(eParentMap,intersect);
          executeDrawPath(sParentMap,intersect);
          return ;
        }
        for(let i = 0 ; i < choices.length ; ++i){
          let row = sCurr.row + choices[i][0];
          let col = sCurr.col + choices[i][1];
          if(grid[row] && grid[row][col] && !grid[row][col].isWall && !sProcessed.has(grid[row][col])){
            let currDistance = sDistanceMap.get(sCurr);
            let edgeDistance = !grid[row][col].weight ? 1 : grid[row][col].weight;
            let newDistance = currDistance + edgeDistance;
            if(newDistance < sDistanceMap.get(grid[row][col])){
              sDistanceMap.set(grid[row][col], newDistance);
              sParentMap.set(grid[row][col], sCurr);
            }
            sMinHeap.push(grid[row][col]);
          }
        }
      }
    }
    if(eMinHeap.length){
      eMinHeap.sort((a,b) => (eDistanceMap.get(b) + eHMap.get(b)) - (eDistanceMap.get(a) + eHMap.get(a)));
      eCurr = eMinHeap.pop();
      if(eProcessed.has(eCurr)){
        eCurr.divReference.classList.add("node-backtrack");
        let intersect = null;
        for(let x of sProcessed) if(eProcessed.has(x)) intersect = x;
        if(intersect){
          console.log("Found intersection!");
          intersect.divReference.classList.add("node-intersection");
          console.log(eParentMap.get(intersect));
          console.log(sParentMap.get(intersect));
          executeDrawPath(eParentMap,intersect);
          executeDrawPath(sParentMap,intersect);
          return ;
        }
        endSkip = true;
      }
      if(!endSkip){
        let div = eCurr.divReference;
        div.classList.add("node-current");
        // let div = curr.divReference;
        setTimeout(()=> {div.classList.remove("node-current"); div.classList.add("node-check");},1000);
        // eCurr.divReference.classList.add("node-check");
        if(eCurr === start){
          console.log("Found it from end");
          return;
        }
        eProcessed.add(eCurr);
        let intersect = null;
        for(let x of sProcessed) if(eProcessed.has(x)) intersect = x;
        if(intersect){
          console.log("Found intersection!");
          intersect.divReference.classList.add("node-intersection");
          console.log(eParentMap.get(intersect));
          console.log(sParentMap.get(intersect));
          executeDrawPath(eParentMap,intersect);
          executeDrawPath(sParentMap,intersect);
          return ;
        }
        for(let i = 0 ; i < choices.length ; ++i){
          let row = eCurr.row + choices[i][0];
          let col = eCurr.col + choices[i][1];
          if(grid[row] && grid[row][col] && !grid[row][col].isWall && !eProcessed.has(grid[row][col])){
            let currDistance = eDistanceMap.get(eCurr);
            let edgeDistance = !grid[row][col].weight ? 1 : grid[row][col].weight;
            let newDistance = currDistance + edgeDistance;
            if(newDistance < eDistanceMap.get(grid[row][col])){
              eDistanceMap.set(grid[row][col], newDistance);
              eParentMap.set(grid[row][col], eCurr);
            }
            eMinHeap.push(grid[row][col]);
          }
        }
      }
    }
  setTimeout(bidirectional,10,nodes, startNode, endNode,sParentMap,eParentMap,sMinHeap,eMinHeap,sProcessed,eProcessed,sDistanceMap,eDistanceMap,sHMap,eHMap,choices)
}else{

  console.log("WASN't FOUND!");
}

}


function bidirectionalRT(grid, start, end){
  if(!grid || !start || !end){
    console.log("Invalid Input!");
    return;
  }

  let sParentMap = new Map();
  let eParentMap = new Map();
  let sMinHeap = [];
  let eMinHeap = [];
  let sProcessed = new Set();
  let eProcessed = new Set();
  let sDistanceMap = new Map();
  let eDistanceMap = new Map();
  let sHMap = new Map();
  let eHMap = new Map();
  let sCurr = start;
  let eCurr = end;
  let choices = [[-1,0],[1,0],[0,-1],[0,1]]
  sMinHeap.push(sCurr);
  eMinHeap.push(eCurr);
  let sH = 0;
  let eH = 0;
  let startSkip = false;
  let endSkip = false;
  for(let i = 0 ; i < grid.length ; ++i){
    for(let j = 0 ; j < grid[i].length ; ++j){
      eDistanceMap.set(grid[i][j],Infinity);
      sDistanceMap.set(grid[i][j],Infinity);
      sH = Math.abs(grid[i][j].row - end.row) + Math.abs(grid[i][j].col - end.col);
      sHMap.set(grid[i][j],sH);
      eH = Math.abs(grid[i][j].row - start.row) + Math.abs(grid[i][j].col - start.col);
      eHMap.set(grid[i][j],eH);
    }
  }
  eDistanceMap.set(eCurr, 0);
  sDistanceMap.set(sCurr, 0);
  eParentMap.set(eCurr, null);
  sParentMap.set(sCurr, null);
  while(sMinHeap.length || eMinHeap.length){
    startSkip = false;
    endSkip = false;
    if(sMinHeap.length){
      sMinHeap.sort((a,b) => (sDistanceMap.get(b) + sHMap.get(b)) - (sDistanceMap.get(a) + sHMap.get(a)));
      sCurr = sMinHeap.pop();
      if(sProcessed.has(sCurr)){
        startSkip = true;
      }
      if(!startSkip){

        sCurr.divReference.classList.add("node-child");
        // if(sCurr === end){
        //   console.log("Found it from start");
        //   return;
        // }
        sProcessed.add(sCurr);
        let intersect = null;
        for(let x of sProcessed) if(eProcessed.has(x)) intersect = x;
        if(intersect){
          console.log("Found intersection!");
          intersect.divReference.classList.add("node-intersection");
          return ;
        }
        for(let i = 0 ; i < choices.length ; ++i){
          let row = sCurr.row + choices[i][0];
          let col = sCurr.col + choices[i][1];
          if(grid[row] && grid[row][col] && !grid[row][col].isWall && !sProcessed.has(grid[row][col])){
            let currDistance = sDistanceMap.get(sCurr);
            let edgeDistance = !grid[row][col].weight ? 1 : grid[row][col].weight;
            let newDistance = currDistance + edgeDistance;
            if(newDistance < sDistanceMap.get(grid[row][col])){
              sDistanceMap.set(grid[row][col], newDistance);
              sParentMap.set(grid[row][col], sCurr);
            }
            sMinHeap.push(grid[row][col]);
          }
        }
      }
    }
    if(eMinHeap.length){
      eMinHeap.sort((a,b) => (eDistanceMap.get(b) + eHMap.get(b)) - (eDistanceMap.get(a) + eHMap.get(a)));
      eCurr = eMinHeap.pop();
      if(eProcessed.has(eCurr)){
        let intersect = null;
        for(let x of sProcessed) if(eProcessed.has(x)) intersect = x;
        if(intersect){
          console.log("Found intersection!");
          intersect.divReference.classList.add("node-intersection");
          return ;
        }
        endSkip = true;
      }
      if(!endSkip){
        eCurr.divReference.classList.add("node-check-rt");
        if(eCurr === start){
          console.log("Found it from end");
          return;
        }
        eProcessed.add(eCurr);
        let intersect = null;
        for(let x of sProcessed) if(eProcessed.has(x)) intersect = x;
        if(intersect){
          console.log("Found intersection!");
          intersect.divReference.classList.add("node-intersection");
          return ;
        }
        for(let i = 0 ; i < choices.length ; ++i){
          let row = eCurr.row + choices[i][0];
          let col = eCurr.col + choices[i][1];
          if(grid[row] && grid[row][col] && !grid[row][col].isWall && !eProcessed.has(grid[row][col])){
            let currDistance = eDistanceMap.get(eCurr);
            let edgeDistance = !grid[row][col].weight ? 1 : grid[row][col].weight;
            let newDistance = currDistance + edgeDistance;
            if(newDistance < eDistanceMap.get(grid[row][col])){
              eDistanceMap.set(grid[row][col], newDistance);
              eParentMap.set(grid[row][col], sCurr);
            }
            eMinHeap.push(grid[row][col]);
          }
        }
      }
    }
  }
  console.log("WASN't FOUND!");

}
