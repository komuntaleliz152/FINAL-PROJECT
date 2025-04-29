// const produceSales = [
//       { name: 'Cowpeas', quantity: 5, price: 1.50, customer: 'Alice', date: '2025-04-20' },
//       { name: 'Beans', quantity: 3, price: 2.00, customer: 'Bob', date: '2025-04-21' },
//       { name: 'Groundnuts', quantity: 4, price: 2.50, customer: 'Charlie', date: '2025-04-19' },
//       { name: 'Soybeans', quantity: 2, price: 3.00, customer: 'Diana', date: '2025-04-18' },
//       { name: 'Maize', quantity: 6, price: 1.20, customer: 'Edward', date: '2025-04-22' }
//     ];

//     const tableBody = document.getElementById('salesTable');

//     function renderTable() {
//       tableBody.innerHTML = '';
//       produceSales.forEach((item, index) => {
//         const total = (item.quantity * item.price).toFixed(2);
//         const row = document.createElement('tr');
//         row.innerHTML = `
//           <td>${item.name}</td>
//           <td>${item.quantity}</td>
//           <td>$${item.price.toFixed(2)}</td>
//           <td>$${total}</td>
//           <td>${item.customer}</td>
//           <td>${item.date}</td>
//           <td>
//             <button class="btn btn-update" onclick="updateRow(${index})">Update</button>
//             <button class="btn btn-delete" onclick="deleteRow(${index})">Delete</button>
//           </td>
//         `;
//         tableBody.appendChild(row);
//       });
//     }

//     function deleteRow(index) {
//       produceSales.splice(index, 1);
//       renderTable();
//     }

//     function updateRow(index) {
//       const item = produceSales[index];
//       const newName = prompt("Update product name:", item.name);
//       const newQty = prompt("Update quantity:", item.quantity);
//       const newPrice = prompt("Update price:", item.price);
//       const newCustomer = prompt("Update customer name:", item.customer);
//       const newDate = prompt("Update date:", item.date);

//       if (newName && newQty && newPrice && newCustomer && newDate) {
//         produceSales[index] = {
//           name: newName,
//           quantity: parseInt(newQty),
//           price: parseFloat(newPrice),
//           customer: newCustomer,
//           date: newDate
//         };
//         renderTable();
//       }
//     }

//     function addRow() {
//       const name = prompt("Enter product name:");
//       const quantity = prompt("Enter quantity:");
//       const price = prompt("Enter price per unit:");
//       const customer = prompt("Enter customer name:");
//       const date = prompt("Enter date (YYYY-MM-DD):");

//       if (name && quantity && price && customer && date) {
//         produceSales.push({
//           name,
//           quantity: parseInt(quantity),
//           price: parseFloat(price),
//           customer,
//           date
//         });
//         renderTable();
//       }
//     }

//     renderTable();



document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#salesTable tbody");
    const addButton = document.querySelector("button:last-of-type");

    // Handle adding a new sale
    addButton.addEventListener("click", () => {
        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td><input type="text" placeholder="Produce"></td>
            <td><input type="number" placeholder="Tonnage (kg)"></td>
            <td><input type="number" placeholder="Amount (UGX)"></td>
            <td><input type="text" placeholder="Buyer Name"></td>
            <td><input type="text" placeholder="Sales Agent"></td>
            <td><input type="datetime-local"></td>
            <td>
                <button class="save">Save</button>
                <button class="delete">Delete</button>
            </td>
        `;
        tableBody.appendChild(newRow);
    });

    // Handle edit and delete via event delegation
    tableBody.addEventListener("click", (e) => {
        const target = e.target;
        const row = target.closest("tr");

        if (target.textContent === "Delete") {
            row.remove();
        } else if (target.textContent === "Edit") {
            makeRowEditable(row);
        } else if (target.classList.contains("save")) {
            saveRow(row);
        }
    });

    function makeRowEditable(row) {
        const cells = row.querySelectorAll("td");
        for (let i = 0; i < cells.length - 1; i++) {
            const currentText = cells[i].textContent;
            const input = document.createElement("input");
            input.value = currentText;
            cells[i].innerHTML = '';
            cells[i].appendChild(input);
        }
        const actionCell = cells[cells.length - 1];
        actionCell.innerHTML = `<button class="save">Save</button><button class="delete">Delete</button>`;
    }

    function saveRow(row) {
        const inputs = row.querySelectorAll("input");
        inputs.forEach((input) => {
            const td = input.parentElement;
            td.textContent = input.value;
        });
        const actionCell = row.querySelector("td:last-child");
        actionCell.innerHTML = `<button>Edit</button><button>Delete</button>`;
    }
});

