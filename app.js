var addButton = document.getElementById('addButton');
var showTask = document.getElementById('showTask');
var textValue = document.getElementById('textValue');
addButton.addEventListener('click', addNewTask);
document.addEventListener('keydown', function (event) {
    if (event.key == 'Enter') {
        addNewTask();
    }
});
var count = 0;
var userTasks = [];
function addNewTask() {
    var inputVale = textValue.value;
    if (inputVale == '' || inputVale == undefined) {
        alert("enter a task");
        return;
    }
    count++;
    var values = {
        id: count,
        task: String(inputVale),
        completed: false
    };
    userTasks.push(values);
    textValue.value = '';
    renderTask();
}
function renderTask() {
    showTask.innerHTML = '';
    var _loop_1 = function (i) {
        var rows = document.createElement('li');
        var butt = document.createElement('button');
        var cmptButton = document.createElement('button');
        rows.style.cssText = 'padding: 10px; margin: 5px 0; display: flex; justify-content: space-between; background: #f5f5f5; border-radius: 5px;';
        var buttonStyle = 'padding: 5px 10px; border: none; border-radius: 4px; color: white; margin-left: 5px; cursor: pointer;';
        if (userTasks[i].completed) {
            cmptButton.textContent = 'Done';
            cmptButton.style.cssText = buttonStyle + 'background: #4CAF50;';
        }
        else {
            cmptButton.textContent = 'Not Done';
            cmptButton.style.cssText = buttonStyle + 'background: #FFA500;';
        }
        cmptButton.onclick = function () {
            changeStatus(userTasks[i].id);
        };
        butt.textContent = 'Delete';
        butt.style.cssText = buttonStyle + 'background: #ff4444;';
        butt.onclick = function () {
            deleteTask(userTasks[i].id);
        };
        rows.textContent = userTasks[i].task + '  ';
        rows.appendChild(cmptButton);
        rows.appendChild(butt);
        showTask.appendChild(rows);
    };
    for (var i = 0; i < userTasks.length; i++) {
        _loop_1(i);
    }
}
function deleteTask(no) {
    userTasks = userTasks.filter(function (tasks) { return no !== tasks.id; });
    renderTask();
}
function changeStatus(no) {
    for (var i = 0; i < userTasks.length; i++) {
        if (userTasks[i].id == no) {
            if (userTasks[i].completed == true) {
                userTasks[i].completed = false;
            }
            else {
                userTasks[i].completed = true;
            }
        }
    }
    renderTask();
}
