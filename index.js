//one way
/** 
function addTodo() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  //console.log(title, "\n", description);
  const originalHtml = document.getElementById("container").innerHTML;
  //document.createElemetn
  const childDiv = document.createElement("div");
  childDiv.innerHTML = title;
  document.getElementById("container").appendChild(childDiv);

  //   document.getElementById("container").innerHTML =
  //     originalHtml +
  //     `<div>
  //     <div>${title}</div>
  //     <div>${description}</div>
  //     <button>Mark as done</button>
  //     </div>`;
}
*/
let globalId = 1; //to give id to all the new todo
function markAsDone(todoId) {
  const parent = document.getElementById(todoId);
  parent.children[2].innerHTML = "Done!";
}

function createChild(title, description, id) {
  const child = document.createElement("div");

  const firstGrandParent = document.createElement("div");
  firstGrandParent.innerHTML = title;

  const secondGrandParent = document.createElement("div");
  secondGrandParent.innerHTML = description;

  const thirdGrandParent = document.createElement("button");
  thirdGrandParent.innerHTML = "Mark as done";
  thirdGrandParent.setAttribute("onclick", `markAsDone(${id})`);

  child.appendChild(firstGrandParent);
  child.appendChild(secondGrandParent);
  child.appendChild(thirdGrandParent);
  child.setAttribute("id", id);

  return child;
}

//

//state will be array and have title,description and id
function updateDomAccToState(state) {
  const parent = document.getElementById("container");
  parent.innerHTML = "";
  for (let i = 0; i < state.length; i++) {
    const child = createChild(
      state[i].title,
      state[i].description,
      state[i].id
    );
    parent.appendChild(child);
  }
}
// updateDomAccToState([
//   {
//     title: "Go to Gym",
//     description: "Go to Gym from 7-9 PM",
//     id: 1,
//   },
// ]);

window.setInterval(async function () {
  const res = await fetch("https://sum-server.100xdevs.com/todos");
  const json = await res.json();
  updateDomAccToState(json.todos);
}, 5000);
