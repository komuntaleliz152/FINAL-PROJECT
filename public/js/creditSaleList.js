function editRow(btn) {
  alert('Edit functionality coming soon!');
}

function deleteRow(btn) {
  const row = btn.closest('tr');
  if (confirm('Are you sure you want to delete this record?')) {
    row.remove();
  }
}

function addCredit() {
  alert('Here you would open a form to add a new credit sale.');
}

// Format dates on page load
document.addEventListener('DOMContentLoaded', function() {
  // Get all table cells and format dates
  const tableCells = document.querySelectorAll('tbody td');
  
  tableCells.forEach(cell => {
    const text = cell.textContent.trim();
    
    // Check if the text contains GMT or timezone info
    if (text.includes('GMT') || text.includes('East Africa Time')) {
      try {
        const date = new Date(text);
        // Format as: Feb 18, 2026
        const formatted = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
        cell.textContent = formatted;
      } catch (e) {
        // If parsing fails, leave as is
      }
    }
  });
});
