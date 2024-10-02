let tasks = [];
let userName = "";
let currentEditIndex = null;  // Track the index of the task being edited

function setUserName() {
    const input = document.getElementById('userName');
    userName = input.value;
    document.getElementById('welcomeUser').textContent = userName || 'User';
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value;
    if (taskName) {
        if (currentEditIndex !== null) {
            tasks[currentEditIndex].name = taskName; // Update the task if editing
            currentEditIndex = null; // Reset edit index
        } else {
            tasks.push({ name: taskName, completed: false }); // Add new task
        }
        taskInput.value = '';
        updateTaskList();
    }
}

function updateTaskList() {
    const taskTable = document.getElementById('taskTable');
    taskTable.innerHTML = '';
    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.completed ? 'Completed' : 'Pending'}</td>
            <td>
                <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </td>
        `;
        taskTable.appendChild(row);
    });
    updateProgress();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateTaskList();
}

function editTask(index) {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].name; // Fill the input with the task name
    currentEditIndex = index; // Set the index for the current edit
}

function updateProgress() {
    const completedTasks = tasks.filter(task => task.completed).length;
    const progressBar = document.getElementById('progressBar');
    const percentage = (completedTasks / tasks.length) * 100 || 0;
    progressBar.style.width = percentage + '%';
}

function showPending() {
    const taskTable = document.getElementById('taskTable');
    taskTable.innerHTML = '';
    tasks.forEach((task, index) => {
        if (!task.completed) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${task.name}</td>
                <td>Pending</td>
                <td>
                    <button onclick="toggleComplete(${index})">Complete</button>
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </td>
            `;
            taskTable.appendChild(row);
        }
    });
}

function showCompleted() {
    const taskTable = document.getElementById('taskTable');
    taskTable.innerHTML = '';
    tasks.forEach((task, index) => {
        if (task.completed) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${task.name}</td>
                <td>Completed</td>
                <td>
                    <button onclick="toggleComplete(${index})">Undo</button>
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </td>
            `;
            taskTable.appendChild(row);
        }
    });
}

// Dark mode toggle function
document.getElementById('modeToggle').onclick = function() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    // Change button text based on the mode
    if (body.classList.contains('dark-mode')) {
        this.textContent = 'Switch to Light Mode';
    } else {
        this.textContent = 'Switch to Dark Mode';
    }
};
