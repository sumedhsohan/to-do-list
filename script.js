// Load tasks from localStorage on page load
window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => {
    createTaskElement(task.text, task.completed);
  });
};

function addTask() {
  const input = document.getElementById("task-input");
  const taskText = input.value.trim();
  if (taskText === "") return;

  createTaskElement(taskText, false);
  input.value = "";

  saveTasks();
}

function createTaskElement(text, completed) {
  const taskList = document.getElementById("task-list");

  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

  li.innerHTML = `
    <span onclick="toggleComplete(this)">${text}</span>
    <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
  `;

  taskList.appendChild(li);
  li.classList.add("fade-in");
}

function toggleComplete(span) {
  span.parentElement.classList.toggle("completed");
  saveTasks();
}

function deleteTask(button) {
  const li = button.parentElement;
  li.style.opacity = '0';
  li.style.transform = 'translateX(100px)';
  setTimeout(() => {
    li.remove();
    saveTasks();
  }, 300);
}

function saveTasks() {
  const taskList = document.querySelectorAll("#task-list li");
  const tasks = [];

  taskList.forEach(li => {
    const text = li.querySelector("span").textContent;
    const completed = li.classList.contains("completed");
    tasks.push({ text, completed });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
