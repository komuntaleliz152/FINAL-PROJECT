// Set date field to today and restrict to today only
document.addEventListener('DOMContentLoaded', () => {
  const saleDateField = document.getElementById('saleDate');
  
  if (saleDateField) {
    const today = new Date().toISOString().split('T')[0];
    saleDateField.value = today;
    saleDateField.setAttribute('max', today);
    saleDateField.setAttribute('min', today);
  }
  
  // Add thousand separator to price and total amount fields
  const priceField = document.getElementById('price');
  const totalField = document.getElementById('total');
  
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  const removeCommas = (str) => {
    return str.replace(/,/g, "");
  };
  
  if (priceField) {
    priceField.addEventListener("input", (e) => {
      let value = removeCommas(e.target.value);
      if (value && !isNaN(value)) {
        e.target.value = formatNumber(value);
      }
    });
  }
  
  if (totalField) {
    totalField.addEventListener("input", (e) => {
      let value = removeCommas(e.target.value);
      if (value && !isNaN(value)) {
        e.target.value = formatNumber(value);
      }
    });
  }
  
  // Remove commas before form submission
  const salesForm = document.getElementById('salesForm');
  if (salesForm) {
    salesForm.addEventListener('submit', (e) => {
      if (priceField) priceField.value = removeCommas(priceField.value);
      if (totalField) totalField.value = removeCommas(totalField.value);
    });
  }
});
