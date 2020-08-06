document.addEventListener("DOMContentLoaded",createCanvas);
document.querySelector("#clear-canvas").addEventListener("click",clear);
document.querySelector("#nodes-slider").addEventListener("input",changeAmount);
let canvas = null;
let ctx = null;
let node_radius = 14;
let vertices = null;
let rect = null;
function createCanvas(){
  canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
  canvas.height = height;
  canvas.width = width;
  document.querySelector("#canvas-container").appendChild(canvas);
  canvas.addEventListener("click",canvasClick);
  vertices = [];
  canvas.oncontextmenu = function(e){
    e.preventDefault();
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    for(let i = 0 ; i < vertices.length ; ++i){
      let isInside = Math.sqrt(Math.pow(vertices[i].x - x, 2) + Math.pow(vertices[i].y - y, 2)) < node_radius;
      if(isInside){
        vertices.splice(i,1);
        break;
      }
    }
    doPrim();
  }
}

function changeAmount(e){
  generateRandomVertices(e,e.target.value);
}

function canvasClick(e){
  e.preventDefault();
  let rect = canvas.getBoundingClientRect(); //where canvas is
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;
  let v = new Vertix(x,y);
  vertices.push(v);
  doPrim();
}

function doPrim(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  primsMST(vertices);
}

function euclideanDistance(x1,y1,x2,y2){
  return Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));
}

function clear(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  vertices = [];
}
function generateRandomVertices(e,max = 25){
  clear();
  let x = null
  let y = null;
  let v = null;
  for(let i = 0 ; i < max ; ++i){
    x = 50 + Math.floor(Math.random() * (canvas.width - 150)) ;
    y = 50 + Math.floor(Math.random() * (canvas.height - 150)) ;
    v = new Vertix(x,y);
    vertices.push(v);
  }
  primsMST(vertices);
}

function primsMST(vertices){
  let unreached = [...vertices];
  let reached = [];
  reached.push(unreached[0]);
  unreached.splice(0,1);
  while(unreached.length){
    let minEdge = Infinity;
    let minVertixIdx = null;
    let parentVertixIdx = null;
    for(let i = 0 ; i < reached.length ; ++i){
      for(let j = 0 ; j < unreached.length ; ++j){
        let edgeWeight = euclideanDistance(reached[i].x,reached[i].y,unreached[j].x,unreached[j].y);
        if(minEdge > edgeWeight){
          minEdge = edgeWeight;
          minVertixIdx = j;
          parentVertixIdx = i;
        }
      }
    }
    ctx.beginPath();
    ctx.moveTo(reached[parentVertixIdx].x,reached[parentVertixIdx].y);
    ctx.lineTo(unreached[minVertixIdx].x,unreached[minVertixIdx].y);
    ctx.stroke();
    reached.push(unreached[minVertixIdx]);
    unreached.splice(minVertixIdx,1);
  }
  for(let i = 0 ; i < vertices.length ; ++i){
    ctx.fillStyle = "#1e2431";
    ctx.beginPath();
    ctx.arc(vertices[i].x, vertices[i].y,node_radius,0,Math.PI * 2);
    ctx.fill();
  }
}
