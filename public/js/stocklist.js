// Stock list JavaScript
// The delete modal is handled by deleteModal.js

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
