let tasks = [];

// Function to add a task
function addTask() {
  const titleInput = document.getElementById('task-title');
  const descriptionInput = document.getElementById('task-description');
  const startDateInput = document.getElementById('task-start-date');
  const endDateInput = document.getElementById('task-end-date');

  const title = titleInput.value;
  const description = descriptionInput.value;
  const startDate = startDateInput.value;
  const endDate = endDateInput.value;

  if (title.trim() !== '') {
    const task = {
      id: Date.now(),
      title: title,
      description: description,
      startDate: startDate,
      endDate: endDate,
      done: false
    };

    tasks.push(task);
    renderTasks();

    // Reset input fields
    titleInput.value = '';
    descriptionInput.value = '';
    startDateInput.value = '';
    endDateInput.value = '';
  }
}

// Function to render tasks
function renderTasks() {
  const tasksContainer = document.getElementById('tasks');
  tasksContainer.innerHTML = '';

  tasks.forEach(function(task) {
    const listItem = document.createElement('li');
    listItem.classList.add('task-item');
    listItem.innerHTML = `
      <input type="checkbox" ${task.done ? 'checked' : ''} onchange="toggleTaskStatus(${task.id}, this.checked)">
      <span class="task-title ${task.done ? 'task-done' : ''}">${task.title}</span>
      <div class="task-description">${task.description}</div>
      <div class="task-actions">
        <button class="btn-primary" onclick="markTaskAsComplete(${task.id})">Complete</button>
        <button class="btn-secondary" onclick="markTaskAsIncomplete(${task.id})">Incomplete</button>
        <button class="btn-secondary" onclick="editTask(${task.id})">Edit</button>
        <button class="btn-secondary" onclick="deleteTask(${task.id})">Delete</button>
      </div>
      <span class="task-date">${task.startDate} - ${task.endDate}</span>
    `;

    tasksContainer.appendChild(listItem);
  });
}

// Function to toggle task status
function toggleTaskStatus(id, done) {
  const task = tasks.find(function(task) {
    return task.id === id;
  });

  if (task) {
    task.done = done;
    renderTasks();
  }
}

// Function to mark a task as complete
function markTaskAsComplete(id) {
  const task = tasks.find(function(task) {
    return task.id === id;
  });

  if (task) {
    task.done = true;
    renderTasks();
  }
}

// Function to mark a task as incomplete
function markTaskAsIncomplete(id) {
  const task = tasks.find(function(task) {
    return task.id === id;
  });

  if (task) {
    task.done = false;
    renderTasks();
  }
}

// Function to edit a task
function editTask(id) {
  const task = tasks.find(function(task) {
    return task.id === id;
  });

  if (task) {
    const titleInput = document.getElementById('task-title');
    const descriptionInput = document.getElementById('task-description');
    const startDateInput = document.getElementById('task-start-date');
    const endDateInput = document.getElementById('task-end-date');

    titleInput.value = task.title;
    descriptionInput.value = task.description;
    startDateInput.value = task.startDate;
    endDateInput.value = task.endDate;

    tasks = tasks.filter(function(task) {
      return task.id !== id;
    });

    renderTasks();
  }
}

// Function to delete a task
function deleteTask(id) {
  tasks = tasks.filter(function(task) {
    return task.id !== id;
  });

  renderTasks();
}

// Function to reload the page without losing content
function reloadPage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  location.reload();
}

// Check if there are tasks stored in localStorage
const storedTasks = localStorage.getItem('tasks');
if (storedTasks) {
  tasks = JSON.parse(storedTasks);
}

// Initial rendering of tasks
renderTasks();
