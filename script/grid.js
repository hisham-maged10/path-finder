document.addEventListener("DOMContentLoaded",generateGrid);
document.querySelector("#size-slider").addEventListener("input", (e) => resizeGrid(e.target.value));
const NODE_SIZE = 28;
let nodes = [];
let startNode = null;
let endNode = null;
let grid = null;
let mouseDown = false;
function resizeGrid(size){
  let rows = height > width ? Math.floor(grid.offsetHeight / size) : Math.floor((height - document.querySelector(".buttons-container").offsetHeight)/ size);
  let cols = Math.floor(grid.offsetWidth / size);
  let startRndRow = Math.floor(Math.random() * rows);
  let startRndCol = Math.floor(Math.random() * cols);
  let endRndRow = Math.floor(Math.random() * rows);
  let endRndCol = Math.floor(Math.random() * cols);
  while(endRndCol === startRndCol){
   endRndCol = Math.floor(Math.random() * cols);
  }
  nodes = [];
  let documentFragment = document.createDocumentFragment();
  for(let i = 0 ; i < rows ; ++i){
    let rowDiv = document.createElement("div");
    rowDiv.className = "grid-row";
    nodes.push([]);
    for(let j = 0 ; j < cols ; ++j){
      let div = document.createElement("div");
      div.classList.add("node");
      div.dataset["row"] = i;
      div.dataset["col"] = j;
      div.style.width = `${size}px`;
      div.style.height = `${size}px`;
      nodes[i][j] = new Node(div,i,j);
      if(i === startRndRow && j === startRndCol){
       div.classList.add("node-start");
       startNode = nodes[i][j];
       nodes[i][j].isStart = true;
      }
      else if(i === endRndRow && j === endRndCol){
       div.classList.add("node-end");
       endNode = nodes[i][j];
       nodes[i][j].isEnd = true;
      }
     rowDiv.appendChild(div);
    }
    documentFragment.appendChild(rowDiv);
  }
  grid.textContent = "";
  grid.appendChild(documentFragment);

}
function generateGrid(){
  let shortcutToastTriggerEl = document.getElementById('shortcut-toast')
  let shortcutToast = new mdb.Toast(shortcutToastTriggerEl)
  shortcutToast.show()
  document.querySelector("#breakpoint-toggler").click();
  setTimeout(() => shortcutToast.hide(),6500);
  grid = document.createElement("div");
  grid.id = "grid";
  document.querySelector("#grid-container").appendChild(grid);
  if(width > height){
    // document.documentElement.style.cssText = "overflow-y:hidden";
  }
  let rows = height > width ? Math.floor(grid.offsetHeight / NODE_SIZE) : Math.floor((height - document.querySelector(".buttons-container").offsetHeight)/ NODE_SIZE);
  let cols = Math.floor(grid.offsetWidth / NODE_SIZE);
  let startRndRow = Math.floor(Math.random() * rows);
  let startRndCol = Math.floor(Math.random() * cols);
  let endRndRow = Math.floor(Math.random() * rows);
  let endRndCol = Math.floor(Math.random() * cols);
  while(endRndCol === startRndCol){
   endRndCol = Math.floor(Math.random() * cols);
  }
  grid.addEventListener("click",divClicked);
  grid.addEventListener("mouseover",divHover);
  grid.addEventListener("mouseout",divOut);
  let fragment = document.createDocumentFragment();
  outer: for(let i = 0 ; i < rows ; ++i){
    let rowDiv = document.createElement("div");
    rowDiv.className = "grid-row";
     nodes.push([]);
     inner: for(let j = 0 ; j < cols ; ++j){
       let div = document.createElement("div");
       div.className = "node";
       div.dataset["row"] = i;
       div.dataset["col"] = j;
       div.style.width = `${NODE_SIZE}px`;
       div.style.height = `${NODE_SIZE}px`;
       nodes[i][j] = new Node(div,i,j);
       if(i === startRndRow && j === startRndCol){
         div.classList.add("node-start");
         startNode = nodes[i][j];
         nodes[i][j].isStart = true;
       }
       else if(i === endRndRow && j === endRndCol){
         div.classList.add("node-end");
         endNode = nodes[i][j];
         nodes[i][j].isEnd = true;
       }
       rowDiv.appendChild(div);
     }
     fragment.appendChild(rowDiv);
  }

  grid.appendChild(fragment);
  let prev = null;
  let prevEnd = null;

  grid.oncontextmenu = function(e) {
    e.preventDefault();
    mouseDown = true;
  }

  grid.addEventListener("touchstart", touchHandler);
  grid.addEventListener("touchmove", touchHandler);
  grid.addEventListener("touchend", touchHandler);
  grid.addEventListener("touchcancel", touchHandler);
  let mouseDownClbk = (e) => {
    e.preventDefault();
    if(e.target === grid || e.target.classList.contains("grid-row"))
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
  }
  let mouseUpClbk = (e) =>{
    e.preventDefault();
    mouseDown = false;
    prev = null;
    prevEnd = null;
    grid.addEventListener("mouseout",divOut);
  }
  let mouseMoveClbk = (e) =>{
    e.preventDefault();
    let row = e.target.dataset["row"];
    let col = e.target.dataset["col"];
    if(e.target === grid || e.target.classList.contains("grid-row"))
    {
      return;
    }
    if(mouseDown){
      if(e.which === 3){
        e.target.classList.remove("node-wall");
        nodes[row][col].isWall = false;
        if(e.shiftKey){
          nodes[row][col].weight = 0;
          e.target.classList.remove("node-strong-1")
        }
        if(e.altKey){
          nodes[row][col].weight = 0;
          e.target.classList.remove("node-strong-3")
        }
        return;
      }
      if(prev && !nodes[row][col].isWall){
        prev.divReference.classList.remove("node-start");
        prev.isStart = false;
        nodes[row][col].isStart = true;
        nodes[row][col].divReference.classList.add("node-start");
        startNode = nodes[row][col];
        prev = nodes[row][col];
        if(running !== ""){
          clearGrid(1);
          visualizeRT();
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
        if(running !== ""){
          clearGrid(1);
          visualizeRT();
        }
        return;
      }
      if(nodes[row][col].isStart || nodes[row][col].isEnd || nodes[row][col].isWall){

        return;
      }
      if(e.shiftKey){
        e.target.classList.add("node-strong-1");
        nodes[row][col].weight = 2;
      }else if(e.altKey){
        e.target.classList.add("node-strong-3");
        nodes[row][col].weight = 3;
      }else{
        e.target.classList.add("node-wall")
        nodes[row][col].isWall = true;
      }
    }
  }

  grid.addEventListener("mousedown",mouseDownClbk);
  grid.addEventListener("mouseup",mouseUpClbk);
  grid.addEventListener("mousemove",mouseMoveClbk);
}

function divClicked(e){
  e.preventDefault();
  if(e.target === grid || e.target.classList.contains("grid-row"))
  {
    return;
  }
  let i = e.target.dataset["row"];
  let j = e.target.dataset["col"];
  let node = nodes[i][j];
  if(node.isStart || node.isEnd || node.isWall || node.weight !== 0){
    return;
  }
  if(startNode && endNode){
    node.isWall = true;
    e.target.classList.add("node-wall");
    return;
  }else if(!startNode){
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
    if(e.target === grid || mouseDown || e.target.classList.contains("grid-row") || e.target.classList.contains("node-wall") || e.target.classList.contains("node-start") || e.target.classList.contains("node-end"))
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
    if(e.target === grid || e.target.classList.contains("grid-row"))
    {
      return;
    }
  if(startNode && endNode )
  {
    e.target.classList.remove("node-wall-hover");
  }
  else if(startNode){
    e.target.classList.remove("node-end");
  }else{
    e.target.classList.remove("node-start");
  }
}

function touchHandler(event)
{
    var touches = event.changedTouches,
        first = touches[0],
        type = "";
    switch(event.type)
    {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type = "mousemove"; break;
        case "touchend":   type = "mouseup";   break;
        default:           return;
    }


    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
                                  first.screenX, first.screenY,
                                  first.clientX, first.clientY, false,
                                  false, false, false, 0/*left*/, null);

    first.target.dispatchEvent(simulatedEvent);
}
