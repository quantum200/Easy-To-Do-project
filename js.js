const input = document.getElementById('task');
const ul = document.getElementById('spisok');
const listContainer = document.querySelector('.list-container');
const radioButtons = document.querySelectorAll('input[name="drone"]');

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.text, task.completed));
}

function saveTasks() {
    const tasks = [];
    ul.querySelectorAll('li').forEach(li => {
        const text = li.textContent.trim();
        const completed = li.getAttribute('data-status') === 'execute';
        tasks.push({ text, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(text, completed = false) {
    const newLi = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    newLi.appendChild(checkbox);
    newLi.appendChild(document.createTextNode(' ' + text));
    newLi.setAttribute('data-status', completed ? 'execute' : 'unfulfilled');
    if (completed) newLi.style.textDecoration = 'line-through';

    ul.appendChild(newLi);
    listContainer.style.display = 'block';

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            newLi.style.textDecoration = 'line-through';
            newLi.setAttribute('data-status', 'execute');
        } else {
            newLi.style.textDecoration = 'none';
            newLi.setAttribute('data-status', 'unfulfilled');
        }
        saveTasks();
        toggleItems();
    });

    newLi.addEventListener('dblclick', () => {
        const newInp = document.createElement('input');
        newInp.type = 'text';
        newInp.value = newLi.textContent.replace(/^\s*✔?\s*/, '');
        newLi.innerHTML = '';
        newLi.appendChild(checkbox);
        newLi.appendChild(newInp);
        newInp.focus();

        const saveEdit = () => {
            const newText = newInp.value.trim();
            if (newText) {
                newLi.innerHTML = '';
                newLi.appendChild(checkbox);
                newLi.appendChild(document.createTextNode(' ' + newText));
                newLi.setAttribute('data-status', checkbox.checked ? 'execute' : 'unfulfilled');
                newLi.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
                saveTasks();
                toggleItems();
            }
        };

        newInp.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') saveEdit();
        });
        newInp.addEventListener('blur', saveEdit);
    });
    saveTasks();
    toggleItems();
}

function toggleItems() {
    const selectedStatus = document.querySelector('input[name="drone"]:checked')?.id;
    const listItems = ul.querySelectorAll('li');

    listItems.forEach(item => {
        const itemStatus = item.getAttribute('data-status');
        item.style.display = (selectedStatus === 'all' || selectedStatus === itemStatus) ? 'list-item' : 'none';
    });
}

function handleTaskInput(event) {
    event.preventDefault();
    const taskText = input.value.trim();
    if (taskText === '') return;

    addTask(taskText);
    input.value = '';
}

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') handleTaskInput(event);
    });
    radioButtons.forEach(radio => radio.addEventListener('change', toggleItems));
});