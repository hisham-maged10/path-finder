document.addEventListener("DOMContentLoaded",generateGrid);
const NODE_SIZE = 28;
const nodes = [];
let startNode = null;
let endNode = null;
let grid = null;
let mouseDown = false;
function generateGrid(){
  // let cols = Math.floor(window.innerWidth / NODE_SIZE) - 1;
  // let rows = Math.floor(window.innerHeight / NODE_SIZE);
  grid = document.createElement("div");
  grid.id = "grid";
  document.body.appendChild(grid);
  // console.log("grid width", grid.offsetWidth);
  // console.log("grid height", grid.offsetHeight);
  const height = window.innerHeight|| document.documentElement.clientHeight||
document.body.clientHeight;
  const width = window.innerWdith || document.documentElement.clientWidth ||
document.body.clientWidth;
  // if(width > height){
  //   document.documentElement.style.cssText = "overflow-y:hidden";
  // }
  let rows = height > width ? Math.floor(grid.offsetHeight / NODE_SIZE) : Math.floor((height - document.querySelector(".buttons-container").offsetHeight)/ NODE_SIZE);
  // console.log(rows);
  // let rows = Math.floor(grid.offsetHeight / NODE_SIZE);
  let cols = Math.floor(grid.offsetWidth / NODE_SIZE);
  grid.addEventListener("click",divClicked);
  grid.addEventListener("mouseover",divHover);
  grid.addEventListener("mouseout",divOut);
  let fragment = document.createDocumentFragment();
  outer: for(let i = 0 ; i < rows ; ++i){
    let rowDiv = document.createElement("div");
    rowDiv.className = "row";
     nodes.push([]);
     inner: for(let j = 0 ; j < cols ; ++j){
       let div = document.createElement("div");
       div.className = "node";
       div.dataset["row"] = i;
       div.dataset["col"] = j;
       nodes[i][j] = new Node(div,i,j);
       rowDiv.appendChild(div);
     }
     fragment.appendChild(rowDiv);
  }

  grid.appendChild(fragment);
  console.log(grid);
  let prev = null;
  let prevEnd = null;

  let mouseDownClbk = (e) => {
    e.preventDefault();
    if(e.target === grid || e.target.classList.contains("row"))
    {
      return;
    }
    if(e.target.classList.contains("node-start")){
      let row = e.target.dataset["row"];
      let col = e.target.dataset["col"];
      prev = nodes[row][col];
    }
    if(e.target.classList.contains("node-end")){
      let row = e.target.dataset["row"];
      let col = e.target.dataset["col"];
      prevEnd = nodes[row][col];
    }
    mouseDown = true;
    // grid.removeEventListener("mouseout",divOut);
  }
  let mouseUpClbk = (e) =>{
    e.preventDefault();
    console.log(e);
    mouseDown = false;
    prev = null;
    prevEnd = null;
    grid.addEventListener("mouseout",divOut);
  }
  let mouseMoveClbk = (e) =>{
    e.preventDefault();
    let row = e.target.dataset["row"];
    let col = e.target.dataset["col"];
    if(e.target === grid || e.target.classList.contains("row"))
    {
      return;
    }
    if(mouseDown){
      if(e.which === 2){
        e.target.classList.remove("node-wall");
        nodes[row][col].isWall = false;
        return;
      }
      if(prev && !nodes[row][col].isWall){
        prev.divReference.classList.remove("node-start");
        prev.isStart = false;
        nodes[row][col].isStart = true;
        nodes[row][col].divReference.classList.add("node-start");
        startNode = nodes[row][col];
        prev = nodes[row][col];
        console.log(status);
        if(status === 1){
          clearGrid(1);
          bfsRT(nodes,startNode, endNode);
        }
        return;
      }

      if(prevEnd && !nodes[row][col].isWall){
        prevEnd.divReference.classList.remove("node-end");
        prevEnd.isEnd = false;
        nodes[row][col].isEnd = true;
        nodes[row][col].divReference.classList.add("node-end");
        endNode = nodes[row][col];
        prevEnd = nodes[row][col];
        console.log(status);
        if(status === 1){
          clearGrid(1);
          bfsRT(nodes,startNode, endNode);
        }
        return;
      }
      if(nodes[row][col].isStart || nodes[row][col].isEnd || nodes[row][col].isWall){

        return;
      }
      if(e.shiftKey){
        e.target.classList.add("node-strong-1");
        nodes[row][col].weight = 1;
      }else if(e.altKey){
        e.target.classList.add("node-strong-2");
        nodes[row][col].weight = 2;
      }else if(e.metaKey){
        e.target.classList.add("node-strong-3")
        nodes[row][col].weight = 3;
      }else{
        e.target.classList.add("node-wall")
        nodes[row][col].isWall = true;
      }
      // console.log(e.target.classList.contains("node-wall"));
      // console.log("moving");
      // console.log(nodes[row][col])
    }
  }

  grid.addEventListener("mousedown",mouseDownClbk);
  grid.addEventListener("mouseup",mouseUpClbk);
  grid.addEventListener("mousemove",mouseMoveClbk);
}

function divClicked(e){
  e.preventDefault();
    if(e.target === grid || e.target.classList.contains("row"))
    {
      return;
    }
  let i = e.target.dataset["row"];
  let j = e.target.dataset["col"];
  if(!startNode){
    e.target.classList.add("node-start");
    nodes[i][j].isStart = true;
    startNode = nodes[i][j];
  }else if(!nodes[i][j].isStart){
    e.target.classList.add("node-end");
    nodes[i][j].isEnd = true;
    endNode = nodes[i][j];
    grid.removeEventListener("click",divClicked);
  }
}

function divHover(e){
  e.preventDefault();
    if(e.target === grid || e.target.classList.contains("row") || e.target.classList.contains("node-wall"))
    {
      return;
    }
  if(startNode && endNode)
  {
    e.target.classList.add("node-wall-hover");
  }
  else if(!startNode){
    e.target.classList.add("node-start");
  }else{
    e.target.classList.add("node-end");
  }
}

function divOut(e){
  e.preventDefault();
    if(e.target === grid || e.target.classList.contains("row"))
    {
      return;
    }
  if(startNode && endNode )
  {
    console.log("should be removed!");
    e.target.classList.remove("node-wall-hover");
  }
  else if(startNode){
    e.target.classList.remove("node-end");
  }else{
    e.target.classList.remove("node-start");
  }
}
