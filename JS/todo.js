
const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");




const TODOS_KEY = "todos";
let toDos = [];


function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event)   {
    const li = event.target.parentElement.parentElement;
    li.remove();
    console.log(typeof li.id);
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
}



function doneFunc(event) {
    const div = event.target.parentElement;
    const li = event.target.parentElement.parentElement;
    const span = li.querySelector("span");
    const cplbutton = div.querySelector("#cpl");

    for (const i in toDos) {
      if (toDos[i].id === parseInt(li.id)) {
        if (toDos[i].is_done === true) {
          span.classList.remove("cpl");
          cplbutton.innerText = "☐";          
          toDos[i].is_done = false;
        } else {
          span.classList.add("cpl");
          cplbutton.innerText = "☑️";
          toDos[i].is_done = true;
        }
      }
    }
    saveToDos();
}


function paintToDo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id;
    li.setAttribute("class","todo-box");
    const span = document.createElement("span");
    span.setAttribute("class","todo-text")
    span.innerText = newTodo.text;
    const div = document.createElement("div");
    div.setAttribute("class", "todo-buttonBox");
    const delbutton = document.createElement("button");
    delbutton.innerText = "❌";
    delbutton.setAttribute("id", "del");
    const cplbutton = document.createElement("button");
    cplbutton.setAttribute("id", "cpl");
    cplbutton.innerText = "☐";
    delbutton.addEventListener("click", deleteToDo);
    cplbutton.addEventListener("click", doneFunc);
    li.appendChild(span);
    li.appendChild(div);
    div.appendChild(cplbutton);
    div.appendChild(delbutton);
    toDoList.appendChild(li);
    if(newTodo.is_done === true)    {
        span.classList.add("cpl");
        cplbutton.innerText = "☑️";
    }
}

function handleToDoSubmit(event){
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newToDoObj = {
        text : newTodo,
        id : Date.now(),
        is_done: false,
    }
    toDos.push(newToDoObj);
    paintToDo(newToDoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null)  {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}


