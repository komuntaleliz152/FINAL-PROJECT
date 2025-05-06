
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
            // row.remove();
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

