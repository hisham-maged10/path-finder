document.addEventListener("DOMContentLoaded",generateGrid);
const NODE_SIZE = 40;
const nodes = [];
let startNode = null;
let endNode = null;

function generateGrid(){
  let cols = Math.floor(window.innerWidth / NODE_SIZE);
  console.log()
  let rows = Math.floor(window.innerHeight / NODE_SIZE);
  let grid = document.createElement("div");
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
  console.log(nodes);

}

function divClicked(e){
  e.preventDefault();
  if(startNode && endNode) { return; }
  let i = parseInt(e.target.dataset["row"]);
  let j = parseInt(e.target.dataset["col"]);
  console.log(i,j)
  if(!startNode){
    e.target.classList.add("node-start");
    nodes[i][j].isStart = true;
    startNode = nodes[i][j];
  }else if(!nodes[i][j].isStart){
    e.target.classList.add("node-end");
    nodes[i][j].isEnd = true;
    endNode = nodes[i][j];
  }
  console.log(nodes[i][j])
}

function divHover(e){
  e.preventDefault();
  if(startNode && endNode)
  {
    return;
  }
  if(!startNode){
    e.target.classList.add("node-start");
  }else{
    e.target.classList.add("node-end");
  }
}

function divOut(e){
  e.preventDefault();
  if(startNode && endNode)
  {
    return;
  }
  if(startNode){
    e.target.classList.remove("node-end");
  }else{
    e.target.classList.remove("node-start");
  }
}
