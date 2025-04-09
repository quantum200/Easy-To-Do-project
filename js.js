const listContainer = document.querySelector('.list-container');
const ul = document.querySelector('.spisok');
const input = document.querySelector('.input');
const radioButtons = document.querySelectorAll('input[name="drone"]');

function Click(event) {
    event.preventDefault();
    if (input.value.trim() === '') return;

    const newLi = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    newLi.appendChild(checkbox);
    newLi.appendChild(document.createTextNode(" " + input.value));
    newLi.setAttribute('data-status', 'unfulfilled');
    ul.appendChild(newLi);
    input.value = "";
    listContainer.style.display = "block";

    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            newLi.style.textDecoration = "line-through";
            newLi.setAttribute('data-status', 'execute');
        } else {
            newLi.style.textDecoration = "none";
            newLi.setAttribute('data-status', 'unfulfilled');
        }
    });

    newLi.addEventListener("dblclick", function () {
        const newInp = document.createElement("input");
        newInp.type = "text";
        newInp.value = newLi.textContent.replace(/^\s*✔?\s*/, "");

        newLi.innerHTML = "";
        newLi.appendChild(checkbox);
        newLi.appendChild(newInp);
        newInp.focus();

        newInp.addEventListener("keyup", function (event) {
            if (event.key === "Enter") {
                saveEdit();
            }
        });

        newInp.addEventListener("blur", saveEdit);

        function saveEdit() {
            newLi.innerHTML = "";
            newLi.appendChild(checkbox);
            newLi.appendChild(document.createTextNode(" " + newInp.value));
        }
    });
}

function toggleItems() {
    const selectedStatus = document.querySelector('input[name="drone"]:checked')?.id;

    const listItems = ul.querySelectorAll('li');
    listItems.forEach(item => {
        const itemStatus = item.getAttribute('data-status');

        if (selectedStatus === 'all' || selectedStatus === itemStatus) {
            item.style.display = 'list-item';
        } else {
            item.style.display = 'none';
        }
    });
}



function CountRadio(){
    const lis = document.querySelectorAll('.spisok li');
//ДОДЕЛАЮ
}






document.addEventListener("DOMContentLoaded", () => {
    radioButtons.forEach(radio => radio.addEventListener('change', toggleItems));
});
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        Click(event);
    }
});