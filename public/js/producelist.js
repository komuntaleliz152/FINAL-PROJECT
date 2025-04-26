const produceSales = [
      { name: 'Cowpeas', quantity: 5, price: 1.50, customer: 'Alice', date: '2025-04-20' },
      { name: 'Beans', quantity: 3, price: 2.00, customer: 'Bob', date: '2025-04-21' },
      { name: 'Groundnuts', quantity: 4, price: 2.50, customer: 'Charlie', date: '2025-04-19' },
      { name: 'Soybeans', quantity: 2, price: 3.00, customer: 'Diana', date: '2025-04-18' },
      { name: 'Maize', quantity: 6, price: 1.20, customer: 'Edward', date: '2025-04-22' }
    ];

    const tableBody = document.getElementById('produce-table-body');

    function renderTable() {
      tableBody.innerHTML = '';
      produceSales.forEach((item, index) => {
        const total = (item.quantity * item.price).toFixed(2);
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>$${item.price.toFixed(2)}</td>
          <td>$${total}</td>
          <td>${item.customer}</td>
          <td>${item.date}</td>
          <td>
            <button class="btn btn-update" onclick="updateRow(${index})">Update</button>
            <button class="btn btn-delete" onclick="deleteRow(${index})">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    }

    function deleteRow(index) {
      produceSales.splice(index, 1);
      renderTable();
    }

    function updateRow(index) {
      const item = produceSales[index];
      const newName = prompt("Update product name:", item.name);
      const newQty = prompt("Update quantity:", item.quantity);
      const newPrice = prompt("Update price:", item.price);
      const newCustomer = prompt("Update customer name:", item.customer);
      const newDate = prompt("Update date:", item.date);

      if (newName && newQty && newPrice && newCustomer && newDate) {
        produceSales[index] = {
          name: newName,
          quantity: parseInt(newQty),
          price: parseFloat(newPrice),
          customer: newCustomer,
          date: newDate
        };
        renderTable();
      }
    }

    function addRow() {
      const name = prompt("Enter product name:");
      const quantity = prompt("Enter quantity:");
      const price = prompt("Enter price per unit:");
      const customer = prompt("Enter customer name:");
      const date = prompt("Enter date (YYYY-MM-DD):");

      if (name && quantity && price && customer && date) {
        produceSales.push({
          name,
          quantity: parseInt(quantity),
          price: parseFloat(price),
          customer,
          date
        });
        renderTable();
      }
    }

    renderTable();

