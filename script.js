const todoinputElement = document.querySelector(".new-todo");
const todoList = document.querySelector(".todo-list");
const iconImg = document.querySelector(".iconimg");
const activeBtn = document.querySelectorAll(".li-active");
const spanItemsElement = document.querySelector(".span-items");
const allClick = document.getElementById("allclick");
const activeClick = document.getElementById("activeclick");
const completedClick = document.getElementById("completedclick");
const clearBtn = document.querySelector(".clear-btn");

alltaskLocaladded();

function inputSection(todoText) {
  const liListItem = document.createElement("li");
  liListItem.classList.add("li-element");
  liListItem.innerHTML = `
        <div class="view">
            <div class="todo-text">
                <input class="toggle" type="checkbox">
                <label for="Checkboxelement" class="label-element">${todoText}</label>
            </div>
            <button class="delete-btn">x</button>
        </div>`;
  todoList.appendChild(liListItem);
  updatespanCount();
}

todoinputElement.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (todoinputElement.value.trim() !== "") {
      inputSection(todoinputElement.value.trim());
      saveTodo();
      resetInput();
    }
  }
});

function resetInput() {
  todoinputElement.value = "";
}

todoList.addEventListener("change", (event) => {
  if (event.target.classList.contains("toggle")) {
    const labelElement = event.target.nextElementSibling;
    if (event.target.checked) {
      labelElement.classList.add("checked");
    } else {
      labelElement.classList.remove("checked");
    }
    saveTodo();
    updatespanCount();
  }
});

todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const listItem = event.target.closest(".li-element");
    listItem.remove();
    updatespanCount();
    saveTodo();
  }
});

iconImg.addEventListener("click", () => {
  const liElements = document.querySelectorAll(".li-element");
  const allChecked = Array.from(liElements).every(
    (li) => li.querySelector(".toggle").checked
  );
  liElements.forEach((li) => {
    const checkbox = li.querySelector(".toggle");
    const label = li.querySelector(".label-element");
    checkbox.checked = !allChecked;
    if (!allChecked) {
      label.classList.add("checked");
    } else {
      label.classList.remove("checked");
    }
  });
  saveTodo();
  updatespanCount();
});

clearBtn.addEventListener("click", () => {
  const liElements = document.querySelectorAll(".li-element .toggle:checked");
  liElements.forEach((task) => task.closest(".li-element").remove());
  updatespanCount();
  saveTodo();
});

function saveTodo() {
  let todos = [];
  todoList.querySelectorAll(".li-element").forEach(function (item) {
    const taskText = item.querySelector(".label-element").textContent.trim();
    todos.push(taskText);
  });
  localStorage.setItem("todo", JSON.stringify(todos));
}

function alltaskLocaladded() {
  const todos = JSON.parse(localStorage.getItem("todo")) || [];
  todos.forEach((taskText) => inputSection(taskText));
}

function updatespanCount() {
  const totalTodo = todoList.querySelectorAll(".li-element").length;
  const completedTodo = todoList.querySelectorAll(
    ".li-element .toggle:checked"
  ).length;
  const allTodo = totalTodo - completedTodo;
  spanItemsElement.textContent = allTodo;
}

activeBtn.forEach((btn) => {
  btn.addEventListener("click", function (event) {
    const active = document.querySelector(".active");
    if (active) {
      active.classList.remove("active");
    }
    this.classList.add("active");
    event.preventDefault();
  });
  saveTodo();
});

allClick.addEventListener("click", () => {
  const liElements = document.querySelectorAll(".li-element");
  liElements.forEach((li) => {
    li.style.display = "block";
  });
  saveTodo();
  updatespanCount();
});

activeClick.addEventListener("click", () => {
  const liElements = document.querySelectorAll(".li-element");
  liElements.forEach((li) => {
    const checkbox = li.querySelector(".toggle");
    if (!checkbox.checked) {
      li.style.display = "block";
    } else {
      li.style.display = "none";
    }
    saveTodo();
  });
  updatespanCount();
});

completedClick.addEventListener("click", () => {
  const liElements = document.querySelectorAll(".li-element");
  liElements.forEach((li) => {
    const checkbox = li.querySelector(".toggle");
    if (checkbox.checked) {
      li.style.display = "block";
      li.style.textDecoration = "none";
    } else {
      li.style.display = "none";
    }
  });
  saveTodo();
  updatespanCount();
});
