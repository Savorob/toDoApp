const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#tasksList');
const emptyList = document.querySelector("#emptyList");

let tasks = [];

if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach((task) => {
    const cssClass = task.done
      ? "task-title task-title--done"
      : "task-title";
    //разметка новой задачи
    const taskHTML = `
    <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${task.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>`;
    //вывод задачи на страницу
    taskList.insertAdjacentHTML("beforeend", taskHTML);
})

checkEmptyList();

form.addEventListener('submit', addTask)

taskList.addEventListener('click', deleteTask)

taskList.addEventListener("click", completeTask)



//Функции
function addTask(event) {
  //отмена отправки формы
  event.preventDefault();
  //достаем введенное в инпут значение
  const taskText = taskInput.value;
  //Описываем задачу в виде обьекта
  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };
  //Добавляем задачу в массив с задачей
  tasks.push(newTask)
  saveToLocalStorage();
  //Формитруем CSS класс
  const cssClass = newTask.done ? "task-title task-title--done" : "task-title";
  //разметка новой задачи
  const taskHTML = `
    <li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${newTask.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>`;
  //вывод задачи на страницу
  taskList.insertAdjacentHTML("beforeend", taskHTML);
  //очистить полев ввода
  taskInput.value = "";
  taskInput.focus();
  checkEmptyList();
}
function deleteTask(event) {
    if (event.target.dataset.action === 'delete') {
        const parentNode = event.target.closest(".list-group-item");
        const id = Number(parentNode.id);
        //Удаляем задачу через фильтрацию массива
        tasks = tasks.filter(function(task){
          return task.id !== id;
        });

        //Удаляем из разметки
        parentNode.remove();
        checkEmptyList();
        saveToLocalStorage();
    }
}
function completeTask(event) {
  if (event.target.dataset.action === 'done') {
    const parentNode = event.target.closest(".list-group-item");
    //Определяем id задачи
    const id = Number(parentNode.id);

    const task = tasks.find(function(task){
      if (task.id === id) {
        return true
      }
    })

    task.done = !task.done

    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');
  }
  saveToLocalStorage();
}
function checkEmptyList() {
  const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
					<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
					<div class="empty-list__title">Список дел пуст</div>
				</li>`;
  if (tasks.length === 0) {
    taskList.insertAdjacentHTML('afterbegin', emptyListHTML);
  }
  
  if (tasks.length > 0) {
    const emptyListEl = document.querySelector('#emptyList');
    emptyListEl ? emptyListEl.remove() : null;
  }
}
function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}