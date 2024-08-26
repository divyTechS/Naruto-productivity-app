const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const timeInput = document.getElementById("time-input");
const descriptionInput = document.getElementById("description-input");
const taskCategory = document.getElementById("task-rank");
const totalXpElement = document.getElementById("total-xp");

const taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {};
let xp = parseInt(localStorage.getItem("xp")) || 0;

const categoryValue = {
    "S-rank": 10,
    "A-rank": 8,
    "B-rank": 6,
    "C-rank": 4,
    "Boss": 15
};

const addOrUpdateTask = () => {
    const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
    const taskObj = {
        id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
        title: titleInput.value,
        date: dateInput.value,
        time: timeInput.value,
        description: descriptionInput.value,
        category: taskCategory.value,
    };

    if (dataArrIndex === -1) {
        taskData.unshift(taskObj);
    } else {
        taskData[dataArrIndex] = taskObj;
    }

    localStorage.setItem("data", JSON.stringify(taskData));
    updateTaskContainer();
    reset();
};

const updateTaskContainer = () => {
    tasksContainer.innerHTML = "";

    taskData.forEach(({ id, title, date, time, description, category }) => {
        tasksContainer.innerHTML += `
            <div class="task" id="${id}">
                <p><strong>Title:</strong> ${title}</p>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Time:</strong> ${time}</p>
                <p><strong>Description:</strong> ${description}</p>
                <p><strong>Category:</strong> ${category}</p>
                <button onclick="editTask(this)" type="button" class="btn">Edit</button>
                <button onclick="taskCompleted(this)" type="button" class="btn">Task Complete</button>
            </div>
        `;
    });
};

const taskCompleted = (buttonEl) => {
    const dataArrIndex = taskData.findIndex(
        (item) => item.id === buttonEl.parentElement.id
    );

    const completedTask = taskData[dataArrIndex];
    const taskXP = categoryValue[completedTask.category] || 0;

    xp += taskXP;
    localStorage.setItem("xp", xp);
    totalXpElement.textContent = xp;

    buttonEl.parentElement.remove();
    taskData.splice(dataArrIndex, 1);

    localStorage.setItem("data", JSON.stringify(taskData));
};

const editTask = (buttonEl) => {
    const dataArrIndex = taskData.findIndex(
        (item) => item.id === buttonEl.parentElement.id
    );

    currentTask = taskData[dataArrIndex];

    titleInput.value = currentTask.title;
    dateInput.value = currentTask.date;
    timeInput.value = currentTask.time;
    descriptionInput.value = currentTask.description;
    taskCategory.value = currentTask.category;

    addOrUpdateTaskBtn.innerText = "Update Task";
    taskForm.classList.toggle("hidden");
};

const reset = () => {
    addOrUpdateTaskBtn.innerText = "Add Task";
    titleInput.value = "";
    dateInput.value = "";
    timeInput.value = "";
    descriptionInput.value = "";
    taskCategory.value = "";
    taskForm.classList.toggle("hidden");
    currentTask = {};
};

if (taskData.length) {
    updateTaskContainer();
}

if (xp) {
    totalXpElement.textContent = xp;
}

openTaskFormBtn.addEventListener("click", () =>
    taskForm.classList.toggle("hidden")
);

closeTaskFormBtn.addEventListener("click", () => {
    const formInputsContainValues = titleInput.value || dateInput.value || timeInput.value || descriptionInput.value;
    const formInputValuesUpdated = titleInput.value !== currentTask.title || dateInput.value !== currentTask.date || timeInput.value !== currentTask.time || descriptionInput.value !== currentTask.description;

    if (formInputsContainValues && formInputValuesUpdated) {
        confirmCloseDialog.showModal();
    } else {
        reset();
    }
});

cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

discardBtn.addEventListener("click", () => {
    confirmCloseDialog.close();
    reset();
});

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addOrUpdateTask();
});
