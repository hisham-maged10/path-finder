document.querySelector("#task-adder").addEventListener("click", generateFormInput);
document.querySelector("#network-visualizer").addEventListener("click", visualizeNetwork);

const form = document.forms["tasks"];
let taskCounter = 1;

function generateFormInput(e){
  e.preventDefault();
  console.log(form)
  ++taskCounter;
  let formHTML = `
          <div class="row g-3 align-items-center mt-1 ml-2">
            <div class="form-outline col-auto mr-2">
              <input
                type="text"
                name="task-${taskCounter}"
                class="form-control"
                aria-describedby="task-${taskCounter}"
                required
              />
              <label class="form-label" for="task-${taskCounter}">Task #${taskCounter}</label>
            </div>
            <div class="form-outline col-auto">
              <input
                type="text"
                name="preq-${taskCounter}"
                class="form-control"
                aria-describedby="preq-${taskCounter}"
                required
              />
              <label class="form-label" for="preq-${taskCounter}">Task #${taskCounter} Prerequisites</label>
            </div>
          <div class="col-auto">
            <span id="textExample2" class="form-text">
              Prerequisites Must be comma separated Values
            </span>
          </div>
        </div>
        `;
  document.querySelector("#tasks-input").insertAdjacentHTML("beforeEnd",formHTML);

}

function visualizeNetwork(e){
  e.preventDefault();
  let data = new FormData(form);
  let adjMap = new Map();
  let inDegreeMap = new Map();
  for(let i = 0 ; i < taskCounter ; ++i){
    let key = data.get(`task-${i+1}`).toLowerCase().trim();
    if(!key){
      continue;
    }
    let values = data.get(`preq-${i+1}`).split(",");
    values = values.filter(str => str.trim().length > 0);
    for(let i = 0 ; i < values.length ; ++i){
      values[i] = values[i].toLowerCase().trim();
      if(!adjMap.has(values[i])){
        adjMap.set(values[i],[key]);
        inDegreeMap.set(values[i],0);
      }else{
        adjMap.get(values[i]).push(key);
      }
    }

    if(key && !adjMap.has(key)){
      adjMap.set(key,[]);
    }
    inDegreeMap.set(key,values.length);
  }
  console.log(adjMap)
  createNetwork(adjMap);
  topologicalSort(adjMap, inDegreeMap)
}

function hasCycle(adjMap){
  let black = new Set();
  for(let [key,value] of adjMap){
    if(!black.has(key) && hasCycleUtil(key, adjMap, black)){
      return true;
    }
  }
  return false;

}
function hasCycleUtil(start, adjMap, black){
  let gray = new Set();
  let visited = new Set();
  let s = [];
  s.push(start);
  let curr = start;
  while(s.length){
    curr = s[s.length - 1];
    if(!visited.has(curr)){
      visited.add(curr);
      gray.add(curr);
    }else{
      gray.delete(curr);
      black.add(s.pop());
    }
    let neighbours = adjMap.get(curr);
    for(let i = 0 ; i < neighbours.length ; ++i){
      if(!visited.has(neighbours[i])){
        s.push(neighbours[i]);
      }else if(gray.has(neighbours[i])){
        return true;
      }
    }
  }
  return false;
}

function topologicalSort(adjMap, inDegreeMap){
  if(hasCycle(adjMap)){
    alert("Has Cycle, can't do topological sort on it!");
    return;
  }
  let q = [];
  for(let [key, value] of inDegreeMap){
    if(value === 0){
      q.push(key);
    }
  }
  let answer = [];
  while(q.length){
    let curr = q.shift();
    answer.push(curr);
    let neighbours = adjMap.get(curr);
    for(let i = 0 ; i < neighbours.length ; ++i){
      inDegreeMap.set(neighbours[i],inDegreeMap.get(neighbours[i]) - 1);
      if(inDegreeMap.get(neighbours[i]) === 0){
        q.push(neighbours[i]);
      }
    }
  }
  console.log(...answer);
}



function createNetwork(adjMap){
  let dataSet = [];
  let edgesArr = [];
  for(let [key,values] of adjMap){
    dataSet.push({id: key, label: key});
    for(let i = 0 ; i < values.length ; ++i){
      edgesArr.push({from: key, to: values[i], width: 1});
    }
  }
  let network = new vis.DataSet(dataSet);
  let edges = new vis.DataSet(edgesArr);

  // create a network
  let container = document.getElementById('mynetwork');
  let data = {
    nodes: network,
    edges: edges
  };
  let options = {
    autoResize: true,
    height: '100%',
    width: '100%',
    locale: 'en',
    clickToUse: false,
    edges: {
      arrows:{
        to:{
          enabled: true
        }
      },
      color:{
        color:"#1168d9",
        highlight: "#051d38"
      }
    },        // defined in the edges module.
    nodes:{
      color:{
        background: "#1e2431",
        border: "#1e2431",
        highlight:{
          background: "#1e2431",
          border: "#1e2431"
        }
      },
      shape:"circle",
      font:{
        color: "#cfddef"
      }
    }
  }
  let graph = new vis.Network(container, data, options);
}

function generateAdjMap(){
  let data = new FormData();

}
