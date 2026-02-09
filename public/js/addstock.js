document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('addStockForm');

  // Set date field to today and restrict to today only
  const dateField = document.getElementById('Date');
  const today = new Date().toISOString().split('T')[0];
  dateField.value = today;
  dateField.setAttribute('max', today);
  dateField.setAttribute('min', today);

  // Thousand separator utility
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const removeCommas = (str) => {
    return str.replace(/,/g, "");
  };

  // Add thousand separator to cost and selling price fields
  const costField = document.getElementById('cost');
  const sellingPriceField = document.getElementById('sellingPrice');

  [costField, sellingPriceField].forEach(field => {
    field.addEventListener("input", (e) => {
      let value = removeCommas(e.target.value);
      if (value && !isNaN(value)) {
        e.target.value = formatNumber(value);
      }
    });
  });

  // Remove commas before form submission
  form.addEventListener("submit", (e) => {
    costField.value = removeCommas(costField.value);
    sellingPriceField.value = removeCommas(sellingPriceField.value);
  });

  // Helper functions
  const isOnlyLetters = str => /^[A-Za-z\s]+$/.test(str);
  const isValidUgandanPhone = str => /^07\d{8}$/.test(str);

  const validators = {
    produceName: {
      validate: value => value.length >= 4 && isOnlyLetters(value),
      message: 'Produce name must be at least 4 letters and contain only letters.'
    },
    produceType: {
      validate: value => value.trim() !== '',
      message: 'Type of produce is required.'
    },
    tonnage: {
      validate: value => value.trim().length >= 3,
      message: 'Tonnage must be at least 3 characters long.'
    },
    cost: {
      validate: value => removeCommas(value).trim().length >= 5,
      message: 'Cost must be at least 5 characters long.'
    },
    dealerName: {
      validate: value => value.length >= 4 && isOnlyLetters(value),
      message: 'Dealer name must be at least 4 letters and contain only letters.'
    },
    branchName: {
      validate: value => value.trim() !== '',
      message: 'Branch name is required.'
    },
    contact: {
      validate: value => isValidUgandanPhone(value),
      message: 'Contact must be a valid Ugandan number (e.g. 07XXXXXXXX).'
    },
    sellingPrice: {
      validate: value => removeCommas(value).trim().length >= 5,
      message: 'Selling price must be at least 5 characters long.'
    },
    Date: {
      validate: value => value.trim() !== '',
      message: 'Date is required.'
    },
    Time: {
      validate: value => value.trim() !== '',
      message: 'Time is required.'
    }
  };

  const validateField = (id) => {
    const input = document.getElementById(id);
    const errorSpan = document.getElementById(`error-${id}`);
    const { validate, message } = validators[id];

    if (!validate(input.value)) {
      input.classList.add('is-invalid');
      errorSpan.textContent = message;
      return false;
    } else {
      input.classList.remove('is-invalid');
      errorSpan.textContent = '';
      return true;
    }
  };

  // On form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let formValid = true;

    for (let id in validators) {
      const valid = validateField(id);
      if (!valid) formValid = false;
    }

    if (formValid) {
      form.submit();
    }
  });

  // Real-time validation (on input blur)
  for (let id in validators) {
    const input = document.getElementById(id);
    input.addEventListener('blur', () => validateField(id));
  }
});

  