let todoList = [];
let count = 0;
let isDeleted = false;

const taskInput = document.getElementById("taskInput"); 
const taskList = document.getElementById("taskList"); 
const deleteAllBtn = document.getElementById("deleteAllBtn"); 

function addTask () {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    count += 1;

    todoList = [
      ...todoList,
      {
        id: count,
        taskText: taskText,
        isDone: false
      }
    ]
    taskInput.value = '';
  }

  renderTaskList();
}

function renderTaskList() {
  taskList.innerHTML = '';
  console.log("isDeleted", isDeleted)


  todoList.map(function (item) {
    let label = document.createElement('label');
    label.className = item.isDone ? 'task-item completed' : 'task-item';
    label.innerHTML = (`
        <div class="inline-flex"> 
          <input type="checkbox" name="check-task" id="id-${item.id}" onclick="completeTask(this)" ${item.isDone ? 'checked' : ''} />
          <span class="task-text">${item.taskText}</span>
        </div>
        <button class="btn-delete-icon" onclick="deleteTask(${item.id})"></button>
    `)

    taskList.appendChild(label)
  })  

  renderFooterNote();
  countUndoneList(todoList);
};

function renderFooterNote() {
  const footerNote = document.getElementById("footerNote"); 

  if (todoList.length > 0) {
    footerNote.innerHTML = (`
      <p class="badge-note">need to be done 
        <span class="badge-number">
          <span class="inner-number" id="totalPending"></span>
        </span>
      </p>
      <div class="align-center">
        <button id="deleteAllBtn" class="btn-delete-all mr-5" onclick="deleteAllTask()">Delete All</button>
        <button id="markAllBtn" class="btn-mark-all mr-5" onclick="markAll()">Mark All as Done</button>  
      </div>
    `);

  } else {
    footerNote.innerHTML = '';
  }
}

function countUndoneList (params) {
  if (params.length > 0) {
    let taskPending = params.filter(item => !item.isDone);
    let spanPending = document.getElementById("totalPending");
    spanPending.textContent = taskPending.length;

    if (taskPending.length == 0 && isDeleted == false) {
      alertSuccess();
    }
  }
}


function completeTask(checkbox) {
  const taskId = parseInt(checkbox.id.split('-')[1]);

  const modifiedTask = todoList.map(item => {
    if (item.id === taskId ) {
        return { ...item, isDone: !item.isDone };
    }
    return item;
  });

  todoList = modifiedTask;
  isDeleted = false;
  renderTaskList();
}

function deleteTask(taskId) {
  todoList = todoList.filter(item => item.id !== taskId);
  isDeleted = true;
  renderTaskList();
}

function deleteAllTask() {
  todoList = [];
  renderTaskList();
}

function alertSuccess() {
  const alertDiv = document.getElementById("alert-success"); 
  alertDiv.textContent = "You did it! 🎉🥳🙌 ";
  alertDiv.style.display = "block";
  setTimeout(() => {
    alertDiv.style.display = "none";
  }, 5000);
}

function markAll() {
  const modifiedTask = todoList.map(item => {
    return { ...item, isDone: true };
  });

  alertSuccess();

  todoList = modifiedTask;
  renderTaskList();
}