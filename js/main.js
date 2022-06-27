const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#tasksList');
const emptyList = document.querySelector("#emptyList");

//добавить задачу по клику
form.addEventListener('submit', addTask)
//удалить задачу
taskList.addEventListener('click', deleteTask)



function addTask(event) {
  //отмена отправки формы
  event.preventDefault();
  //достаем введенное в инпут значение
  const taskText = taskInput.value;
  //разметка новой задачи
  const taskHTML = `
    <li class="list-group-item d-flex justify-content-between task-item">
					<span class="task-title">${taskText}</span>
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
  //Скрыть сообщение о пустом списке дел
  if (taskList.children.length > 1) {
    emptyList.classList.add("none");
  }
}
function deleteTask(event) {
    if (event.target.dataset.action === 'delete') {
        const parentNode = event.target.closest(".list-group-item");
        parentNode.remove();
    }
    if (taskList.children.length === 1) {
      emptyList.classList.remove("none");
    }
}