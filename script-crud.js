// Add new task
const btnAddTask = document.querySelector(".app__button--add-task");
const formAddTask = document.querySelector(".app__form-add-task");
const textareaAddTask = document.querySelector(".app__form-textarea");
const ulTaskList = document.querySelector(".app__section-task-list");
const activeTaskDescription = document.querySelector(
  ".app__section-active-task-description"
);
const btnRemoveFinished = document.querySelector("#btn-remove-finished");
const btnRemoveAll = document.querySelector("#btn-remove-all");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let selectedTask = null;
let selectedLi = null;

btnAddTask.addEventListener("click", () => {
  formAddTask.classList.toggle("hidden");
});

btnRemoveFinished.onclick = () => {
  const selector = ".app__section-task-list-item-complete";
  document.querySelectorAll(selector).forEach((element) => {
    element.remove();
  });
  tasks = tasks.filter((task) => !task.done);
  updateTasks();
};

btnRemoveAll.onclick = () => {
  ulTaskList.innerHTML = "";
  tasks = [];
  updateTasks();
};

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

function finishTask(task, liElement) {
  liElement.classList.remove("app__section-task-list-item-active");
  liElement.classList.add("app__section-task-list-item-complete");
  liElement.querySelector("button")?.setAttribute("disabled", "disabled");

  activeTaskDescription.textContent = "";
  task.done = true;
  updateTasks();
  selectedTask = null;
  selectedLi = null;
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

  liElement.appendChild(svgElement);
  liElement.appendChild(pElement);
  liElement.appendChild(btnEditElement);

  if (task.done) {
    finishTask(task, liElement);
  } else {
    liElement.onclick = () => {
      if (task.done) return;
      selectedLi?.classList.remove("app__section-task-list-item-active");

      if (selectedTask === task) {
        activeTaskDescription.textContent = "";
        selectedTask = null;
        selectedLi = null;
        return;
      }

      selectedTask = task;
      selectedLi = liElement;
      activeTaskDescription.textContent = task.description;
      liElement.classList.add("app__section-task-list-item-active");
    };
  }

  return liElement;
}

tasks.forEach((task) => {
  const taskElement = createTaskElement(task);
  ulTaskList.append(taskElement);
});

document.addEventListener("FinishedFocus", () => {
  if (selectedTask) finishTask(selectedTask, selectedLi);
});
