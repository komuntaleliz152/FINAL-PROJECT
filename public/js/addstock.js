
document.addEventListener('DOMContentLoaded', function () {
    // Confirm before deleting a stock item
    const deleteForms = document.querySelectorAll("form[action='/delete-stock']");
  
    deleteForms.forEach(form => {
      form.addEventListener('submit', function (e) {
        const confirmDelete = confirm("Are you sure you want to delete this stock item?");
        if (!confirmDelete) {
          e.preventDefault();
        }
      });
    });
  
    // Optional: Simple table search filter
    const searchInput = document.createElement('input');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('placeholder', 'Search stocks...');
    searchInput.classList.add('form-control', 'mb-3');
  
    const tableContainer = document.querySelector('#procurement-table').parentElement;
    tableContainer.insertBefore(searchInput, tableContainer.firstChild);
  
    searchInput.addEventListener('keyup', function () {
      const filter = searchInput.value.toLowerCase();
      const rows = document.querySelectorAll('#procurement-table tbody tr');
  
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? '' : 'none';
      });
    });
  });
  