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
              <label class="form-label" for="preq-1">Task #${taskCounter} Prerequisites</label>
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
  for(let i = 0 ; i < taskCounter ; ++i){
    let values = data.get(`preq-${i+1}`).split(",");
    let key = data.get(`task-${i+1}`).toLowerCase().trim();
    for(let i = 0 ; i < values.length ; ++i){
      values[i] = values[i].toLowerCase().trim();
      if(!adjMap.has(values[i])){
        adjMap.set(values[i],[]);
      }
    // if(adjMap.has(key)){
    //   adjMap.get(key).push(...values);
    // }else{
      adjMap.set(key, values);
    // }
  }
  console.log(adjMap);
  createNetwork(adjMap);
  }
}
function createNetwork(adjMap){
let dataSet = [];
for(let [key,value] of adjMap){
  console.log("----------------");
  console.log(key,value);
  console.log("----------------");
}
return;
let network = new vis.DataSet([
    {id: 1, label: 'Node 1'},
    {id: 2, label: 'Node 2'},
    {id: 3, label: 'Node 3'},
    {id: 4, label: 'Node 4'},
    {id: 5, label: 'Node 5'}
  ]);

  // create an array with edges
  let edges = new vis.DataSet([
    {from: 1, to: 3, width: 1},
    {from: 1, to: 2, width: 1},
    {from: 2, to: 4, width: 1},
    {from: 2, to: 5, width: 1},
    {from: 2, to: 3, width: 1},
  ]);

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
