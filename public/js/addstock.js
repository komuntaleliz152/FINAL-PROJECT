// Thousand separator utility
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const removeCommas = (str) => {
  return str.replace(/,/g, "");
};

document.addEventListener('DOMContentLoaded', () => {
  const tonnageField = document.getElementById('tonnage');
  const costPerKgField = document.getElementById('costPerKg');
  const totalCostField = document.getElementById('cost');
  const sellingPricePerKgField = document.getElementById('sellingPricePerKg');
  const totalSellingPriceField = document.getElementById('sellingprice');
  const dateField = document.getElementById('date');
  const form = document.getElementById('stockForm');

  // Set date field to today and restrict to today only
  if (dateField) {
    const today = new Date().toISOString().split('T')[0];
    dateField.value = today;
    dateField.setAttribute('max', today);
    dateField.setAttribute('min', today);
  }

  // Function to calculate totals
  function calculateTotals() {
    const tonnage = parseFloat(tonnageField.value) || 0;
    const costPerKg = parseFloat(removeCommas(costPerKgField.value)) || 0;
    const sellingPricePerKg = parseFloat(removeCommas(sellingPricePerKgField.value)) || 0;

    // Calculate total cost
    const totalCost = tonnage * costPerKg;
    totalCostField.value = totalCost > 0 ? formatNumber(Math.round(totalCost)) : '';

    // Calculate total selling price
    const totalSellingPrice = tonnage * sellingPricePerKg;
    totalSellingPriceField.value = totalSellingPrice > 0 ? formatNumber(Math.round(totalSellingPrice)) : '';
  }

  // Add thousand separator to per kg fields
  [costPerKgField, sellingPricePerKgField].forEach(field => {
    if (field) {
      field.addEventListener("input", (e) => {
        let value = removeCommas(e.target.value);
        if (value && !isNaN(value)) {
          e.target.value = formatNumber(value);
        }
        calculateTotals();
      });
    }
  });

  // Recalculate when tonnage changes
  if (tonnageField) {
    tonnageField.addEventListener('input', calculateTotals);
  }

  // Remove commas before form submission
  if (form) {
    form.addEventListener('submit', (e) => {
      // Remove commas from readonly fields before submission
      if (totalCostField.value) {
        totalCostField.value = removeCommas(totalCostField.value);
      }
      if (totalSellingPriceField.value) {
        totalSellingPriceField.value = removeCommas(totalSellingPriceField.value);
      }
    });
  }
});
