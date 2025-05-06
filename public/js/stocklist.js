// Update a row
function UpdateRow(button) {
    const row = button.closest('tr');
    const produceName = row.cells[0].innerText;
    alert(`Update function called for: ${produceName}`);
    // TODO: Open update modal or navigate to edit page
  }
  
  // Delete a row
  function deleteRow(button) {
    const row = button.closest('tr');
    const produceName = row.cells[0].innerText;
  
    if (confirm(`Are you sure you want to delete the stock for "${produceName}"?`)) {
      row.remove();
      // TODO: Send DELETE request to server using Fetch or Axios
      console.log(`Deleted row for: ${produceName}`);
    }
  }
  
  function addNewStock() {
    alert("Add stock button clicked!");
    // window.location.href = "/addstock"; // Optional redirect
  }
     
  