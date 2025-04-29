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

