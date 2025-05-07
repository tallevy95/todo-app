// Class Definitions
// ==========================
class Task {
  constructor(task, due) {
    this.task = task;
    this.due = due;
    this.completed = false;
  }
}

// Global Variables
// ==========================
const currentList = [];
const doneList = [];


// Functions
// ==========================
function addTask(event) {
  event.preventDefault();

  const task = document.getElementById("todo-input").value.trim();
  const due = document.getElementById("todo-date").value;

  if (task === '') {
    alert("Please enter a task.");
    return;
  }

  const newTask = new Task(task, due);
  currentList.push(newTask);
  
  renderTodoList(currentList, "todo-table");

  document.getElementById("todo-form").reset();
}

function renderTodoList(list, table) {
  const tbody = document.getElementById(table);

  tbody.innerHTML = "";

  list.forEach((task, index) => {
    const tr = document.createElement('tr');
    
    // Create and append cells safely
    const taskCell = document.createElement('td');
    taskCell.textContent = task.task;
    
    const dueCell = document.createElement('td');
    dueCell.textContent = task.due;
    
    const checkboxCell = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `task-${index}`;
    checkbox.checked = task.completed;
    
    checkboxCell.appendChild(checkbox);
    tr.appendChild(taskCell);
    tr.appendChild(dueCell);
    tr.appendChild(checkboxCell);
    
    tbody.appendChild(tr);
  });
}

function toggleTaskCompletion(event) {
  const taskId = event.target.id.split('-')[1];
  
  currentList[taskId].completed = event.target.checked;
  doneList.push(currentList[taskId]);
  currentList.splice(taskId, 1);
  renderTodoList(currentList, "todo-table");
  renderTodoList(doneList, "done-table");
}

// Event Listeners
// ==========================
document.getElementById("submit-new-task").addEventListener("click", addTask);
document.getElementById("todo-table").addEventListener("change", toggleTaskCompletion);

// function addEventListener(eventType, callback) {
//   const event = {
//     type: eventType,
//     target: document.getElementById("todo-table"),
//   }
//   callback(event)
// }