const form = document.getElementById('todoForm');
const input = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addTaskButton = document.getElementById('addTaskButton');

addTaskButton.addEventListener('click', function(event) {
  event.preventDefault();
  const taskText = input.value;
  if (!taskText.trim()) return;

  const newLi = document.createElement('li');
  newLi.className = 'list-group-item d-flex align-items-center';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'form-check-input me-2';

  const span = document.createElement('span');
  span.textContent = taskText;

  checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
      span.style.textDecoration = 'line-through';
    } else {
      span.style.textDecoration = '';
    }
  });

  newLi.appendChild(checkbox);
  newLi.appendChild(span);
  taskList.appendChild(newLi);
  const clearBtn = document.getElementById('clearTasksButton');
clearBtn.addEventListener('click', function (e) {
  e.preventDefault();            
  taskList.innerHTML = '';       
  input.focus();                 
});

  input.value = '';
  
});
