// =========================
// Class Definitions
// ==========================

class Task {
  /**
   * Creates a new Task instance.
   * @param {number} id - Unique identifier for the task.
   * @param {string} task - The task description.
   * @param {string} due - The due date for the task.
   */
  constructor(id, task, due) {
    this.id = id;
    this.task = task;
    this.due = due;
    this.completed = false;
  }
}

// ==========================
// Global Variables
// ==========================

let taskIdCounter = 0; // Unique ID for each task
const currentList = []; // Array to hold current (active) tasks
const doneList = []; // Array to hold completed tasks

// ==========================
// Functions
// ==========================

/**
 * Handles the submission of the todo form.
 * Validates input, createss a new Task, adds it to the current list, and re-rendes the UI.
 * @param {Event} event - The form submit event.
 */
function addTask(event) {
  event.preventDefault();

  const taskInput = document.getElementById("todo-input");
  const dueInput = document.getElementById("todo-date");

  const task = taskInput.value.trim();
  const due = dueInput.value;

  if (task === '') {
    alert("Please enter a task.");
    return;
  }

  const newTask = new Task(taskIdCounter++, task, due);
  currentList.push(newTask);
  
  renderTodoList(currentList, "todo-table", false);

  document.getElementById("todo-form").reset();
}

function renderTodoList(list, tableId, isDone) {
  const tbody = document.getElementById(tableId);

  tbody.innerHTML = "";

  list.forEach((task, index) => {
    const tr = document.createElement('tr');
    
    // Task description cell
    const taskCell = document.createElement('td');
    taskCell.textContent = task.task;
    
    // Due date cell
    const dueCell = document.createElement('td');
    dueCell.textContent = task.due;
    
    //  Checkbox cell
    const statusCell = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Mark task "${task.task}" as ${isDone ? "not completed" : "completed"}`);
    checkbox.dataset.taskId = task.id; // Store task ID in DOM for reference

    // Attach event listener directly to this checkbox
    checkbox.addEventListener("change", handleToggleTask);
    
    statusCell.appendChild(checkbox);

    // Build row
    tr.appendChild(taskCell);
    tr.appendChild(dueCell);
    tr.appendChild(statusCell);
    
    // Append row to table body
    tbody.appendChild(tr);
  });
}


/**
 * Handles the toggling of a task's completion status via checkbox.
 * Moves tasks between currentList and doneList accordingly.
 * @param {Event} event - The change event from a checkbox.
 */
function handleToggleTask(event) {
  const taskId = parseInt(event.target.dataset.taskId);
  const isChecked = event.target.checked;

  // Find task in currentList
  let taskIndex = currentList.findIndex((t) => t.id === taskId);

  if (taskIndex !== -1 && isChecked) {
    // Move task → doneList
    currentList[taskIndex].completed = true;
    doneList.push(currentList[taskIndex]);
    currentList.splice(taskIndex, 1);
  } else if (!isChecked) {
    // Find task in doneList and move it back → currentList
    taskIndex = doneList.findIndex((t) => t.id === taskId);
    if (taskIndex !== -1) {
      doneList[taskIndex].completed = false;
      currentList.push(doneList[taskIndex]);
      doneList.splice(taskIndex, 1);
    }
  }

  // Re-render both lists
  renderTodoList(currentList, "todo-table"), false;
  renderTodoList(doneList, "done-table", true);
}


// ===========================
// Event Listeners
// ==========================

/**
 * Attach submit listener to the form to handle new task additions.
 */
document.getElementById("todo-form").addEventListener("submit", addTask);