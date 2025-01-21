// Add new task
const btnAddTask = document.querySelector(".app__button--add-task");
const formAddTask = document.querySelector(".app__form-add-task");
const textareaAddTask = document.querySelector(".app__form-textarea");
const ulTaskList = document.querySelector(".app__section-task-list");
const activeTaskDescription = document.querySelector(
  ".app__section-active-task-description"
);

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let selectedTask = null;

btnAddTask.addEventListener("click", () => {
  formAddTask.classList.toggle("hidden");
});

formAddTask.addEventListener("submit", (e) => {
  e.preventDefault();
  const descriptionTask = textareaAddTask.value;
  if (descriptionTask) {
    addTask(descriptionTask);
    formAddTask.classList.add("hidden");
    textareaAddTask.value = "";
  }
});

function updateTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function addTask(descriptionTask) {
  const task = {
    description: descriptionTask,
    done: false,
  };

  const taskElement = createTaskElement(task);
  ulTaskList.append(taskElement);

  tasks.push(task);
  updateTasks();
}

function createTaskElement(task) {
  const liElement = document.createElement("li");
  liElement.classList.add("app__section-task-list-item");

  const svgElement = document.createElement("svg");
  svgElement.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>`;

  svgElement.onclick = () => {
    task.done = !task.done;
    if (task.done) {
      svgElement.innerHTML = `
            <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
                <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
            </svg>`;
      liElement.classList.add("app__section-task-list-item--done");
    } else {
      svgElement.innerHTML = `
            <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            </svg>`;
      liElement.classList.remove("app__section-task-list-item--done");
    }
    updateTasks();
  };

  const pElement = document.createElement("p");
  pElement.classList.add("app__section-task-list-item-description");
  pElement.textContent = task.description;

  const btnEditElement = document.createElement("button");
  btnEditElement.classList.add("app_button-edit");
  const imgElement = document.createElement("img");
  imgElement.setAttribute("src", "/images/edit.png");
  btnEditElement.appendChild(imgElement);

  btnEditElement.onclick = () => {
    const newDescription = prompt("Edit task", task.description);
    if (newDescription) {
      task.description = newDescription;
      pElement.textContent = newDescription;
      updateTasks();
    }
  };

  liElement.onclick = () => {
    document
      .querySelectorAll(".app__section-task-list-item-active")
      .forEach((e) => {
        e.classList.remove("app__section-task-list-item-active");
      });

    if (selectedTask === task) {
      activeTaskDescription.textContent = '';
      selectedTask = null;
      return;
    }

    selectedTask = task;
    activeTaskDescription.textContent = task.description;
    liElement.classList.add("app__section-task-list-item-active");
  };

  liElement.appendChild(svgElement);
  liElement.appendChild(pElement);
  liElement.appendChild(btnEditElement);
  return liElement;
}

tasks.forEach((task) => {
  const taskElement = createTaskElement(task);
  ulTaskList.append(taskElement);
});
