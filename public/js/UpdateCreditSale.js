// Thousand separator utility
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const removeCommas = (str) => {
  return str.replace(/,/g, "");
};

// Add thousand separator on page load
document.addEventListener('DOMContentLoaded', () => {
  const amountDueField = document.getElementById('amountDue');
  const form = document.getElementById('creditSaleForm');
  
  // Format existing value on load
  if (amountDueField && amountDueField.value) {
    const cleanValue = removeCommas(amountDueField.value);
    if (cleanValue && !isNaN(cleanValue)) {
      amountDueField.value = formatNumber(cleanValue);
    }
  }
  
  // Add thousand separator as user types
  if (amountDueField) {
    amountDueField.addEventListener("input", (e) => {
      let value = removeCommas(e.target.value);
      if (value && !isNaN(value)) {
        e.target.value = formatNumber(value);
      }
    });
  }
  
  // Remove commas before form submission
  if (form) {
    form.addEventListener('submit', (e) => {
      if (amountDueField) {
        amountDueField.value = removeCommas(amountDueField.value);
      }
    });
  }
});
