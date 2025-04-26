
function editRow(button) {
    let row = button.parentElement.parentElement;
    let cells = row.querySelectorAll("td");
    for (let i = 0; i < cells.length - 1; i++) {
        let currentValue = cells[i].innerText;
        cells[i].innerHTML = `<input type='text' value='${currentValue}'>`;
    }
    button.innerText = "Save";
    button.onclick = function() { saveRow(this); };
}

function saveRow(button) {
    let row = button.parentElement.parentElement;
    let inputs = row.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
        row.cells[i].innerText = inputs[i].value;
    }
    button.innerText = "Edit";
    button.onclick = function() { editRow(this); };
}

function deleteRow(button) {
    let row = button.parentElement.parentElement;
    row.remove();
}

function addRow() {
    let table = document.getElementById("salesTable");
    let newRow = table.insertRow();
    let products = ["Cowpeas", "Maize", "Beans", "Groundnuts", "Soybeans"];
    let product = products[Math.floor(Math.random() * products.length)];
    
    newRow.innerHTML = `
        <td>${product}</td>
        <td>0</td>
        <td>0.00</td>
        <td>0.00</td>
        <td>
            <button class="btn edit-btn" onclick="editRow(this)">Edit</button>
            <button class="btn delete-btn" onclick="deleteRow(this)">Delete</button>
        </td>
    `;
}