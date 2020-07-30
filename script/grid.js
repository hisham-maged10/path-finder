document.addEventListener("DOMContentLoaded",generateGrid);
const NODE_SIZE = 30;
const nodes = [];
let startNode = null;
let endNode = null;
let grid = null;
let mouseDown = false;
function generateGrid(){
  let cols = Math.floor(window.innerWidth / NODE_SIZE) - 1;
  let rows = Math.floor(window.innerHeight / NODE_SIZE);
  grid = document.createElement("div");
  grid.id = "grid";
  document.body.appendChild(grid);
  grid.addEventListener("click",divClicked);
  grid.addEventListener("mouseover",divHover);
  grid.addEventListener("mouseout",divOut);
  let fragment = document.createDocumentFragment();
  outer: for(let i = 0 ; i < rows ; ++i){
     nodes.push([]);
     inner: for(let j = 0 ; j < cols ; ++j){
       let div = document.createElement("div");
       div.className = "node";
       div.dataset["row"] = i;
       div.dataset["col"] = j;
       nodes[i][j] = new Node(div,i,j);
       fragment.appendChild(div);
     }
  }

  grid.appendChild(fragment);
  console.log(grid);

  let mouseDownClbk = (e) => {
    e.preventDefault();
    if(e.target === grid)
    {
      return;
    }
    mouseDown = true;
    // grid.removeEventListener("mouseout",divOut);
  }
  let mouseUpClbk = (e) =>{
    e.preventDefault();
    console.log(e);
    mouseDown = false;
    grid.addEventListener("mouseout",divOut);
  }
  let mouseMoveClbk = (e) =>{
    e.preventDefault();
    if(e.target === grid)
    {
      return;
    }
    if(mouseDown){
      let row = e.target.dataset["row"];
      let col = e.target.dataset["col"];
      if(e.which === 2){
        e.target.classList.remove("node-wall");
        nodes[row][col].isWall = false;
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
    if(e.target === grid)
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
    if(e.target === grid)
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
    if(e.target === grid)
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
