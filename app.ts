const addButton = document.getElementById("addButton") as HTMLButtonElement;
const showTask = document.getElementById("showTask") as HTMLUListElement;
const textValue = document.getElementById("textValue") as HTMLInputElement;

addButton.addEventListener("click", addNewTask);

document.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    addNewTask();
  }
});

let count: number = 0;

interface data {
  id: number;
  task: string;
  completed: boolean;
}

let userTasks: data[] = [];

function addNewTask(): void {
  let inputVale = textValue.value;

  if (inputVale == "" || inputVale == undefined) {
    alert("enter a task");
    return;
  }

  count++;

  let values: data = {
    id: count,
    task: String(inputVale),
    completed: false,
  };

  userTasks.push(values);

  textValue.value = "";

  renderTask();
}

function renderTask(): void {
  showTask.innerHTML = "";

  for (let i = 0; i < userTasks.length; i++) {
    let rows = document.createElement("li");
    let butt = document.createElement("button");
    let cmptButton = document.createElement("button");

    rows.style.cssText =
      "padding: 10px; margin: 5px 0; display: flex; justify-content: space-between; background: #f5f5f5; border-radius: 5px;";

    const buttonStyle =
      "padding: 5px 10px; border: none; border-radius: 4px; color: white; margin-left: 5px; cursor: pointer;";

    if (userTasks[i].completed) {
      cmptButton.textContent = "Done";
      cmptButton.style.cssText = buttonStyle + "background: #4CAF50;";
    } else {
      cmptButton.textContent = "Not Done";
      cmptButton.style.cssText = buttonStyle + "background: #FFA500;";
    }

    cmptButton.onclick = function () {
      changeStatus(userTasks[i].id);
    };

    butt.textContent = "Delete";
    butt.style.cssText = buttonStyle + "background: #ff4444;";
    butt.onclick = function () {
      deleteTask(userTasks[i].id);
    };

    rows.textContent = userTasks[i].task + "  ";
    rows.appendChild(cmptButton);
    rows.appendChild(butt);
    showTask.appendChild(rows);
  }
}

function deleteTask(no: number): void {
  userTasks = userTasks.filter((tasks) => no !== tasks.id);
  renderTask();
}

function changeStatus(no: number): void {
  for (let i = 0; i < userTasks.length; i++) {
    if (userTasks[i].id == no) {
      if (userTasks[i].completed == true) {
        userTasks[i].completed = false;
      } else {
        userTasks[i].completed = true;
      }
    }
  }
  renderTask();
}
