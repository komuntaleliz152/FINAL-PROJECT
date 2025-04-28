// Function to handle "Edit" action
function editSale(button) {
    const row = button.parentElement.parentElement;
    const cells = row.getElementsByTagName('td');
    alert(`Editing sale for ${cells[0].textContent}`);
    // Here you can add logic to edit the sale, such as displaying a form
}

// Function to handle "Delete" action
function deleteSale(button) {
    const row = button.parentElement.parentElement;
    if (confirm("Are you sure you want to delete this sale?")) {
        row.remove();
    }
}

// Function to handle "Add Sale" action
function addSale() {
    const table = document.getElementById("salesTable").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    
    // Create cells and add data (you can modify this to gather real data)
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);
    const cell7 = newRow.insertCell(6);

    cell1.textContent = "New Product";
    cell2.textContent = "100";
    cell3.textContent = "200,000";
    cell4.textContent = "New Buyer";
    cell5.textContent = "New Agent";
    cell6.textContent = new Date().toLocaleString();
    cell7.innerHTML = '<button onclick="editSale(this)">Edit</button><button onclick="deleteSale(this)">Delete</button>';
}
