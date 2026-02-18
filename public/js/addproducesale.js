// Thousand separator utility
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const removeCommas = (str) => {
  return str.replace(/,/g, "");
};

// Add thousand separator and date restriction on page load
document.addEventListener('DOMContentLoaded', () => {
  const amountField = document.getElementById('amount');
  const dateTimeField = document.getElementById('saleDateTime');
  const form = document.getElementById('produceSaleForm');
  
  // Set datetime field to now and restrict to today only
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const currentTime = now.toTimeString().slice(0, 5);
  const currentDateTime = `${today}T${currentTime}`;
  
  if (dateTimeField) {
    dateTimeField.value = currentDateTime;
    dateTimeField.setAttribute('max', `${today}T23:59`);
    dateTimeField.setAttribute('min', `${today}T00:00`);
  }
  
  if (amountField) {
    amountField.addEventListener("input", (e) => {
      let value = removeCommas(e.target.value);
      if (value && !isNaN(value)) {
        e.target.value = formatNumber(value);
      }
    });
  }

  // Remove commas before form submission
  if (form) {
    form.addEventListener('submit', (e) => {
      if (amountField) {
        amountField.value = removeCommas(amountField.value);
      }
    });
  }
});

function validateForm() {
  const fields = [
    {
      el: document.getElementById("produce"),
      min: 4,
      errorId: "produceNameError",
      msg: "Produce name must be at least 4 characters and contain only letters.",
      letterOnly: true
    },
    {
      el: document.getElementById("tonnage"),
      min: 3,
      errorId: "tonnageError",
      msg: "Tonnage must be at least 3 digits."
    },
    {
      el: document.getElementById("amount"),
      min: 5,
      errorId: "amountError",
      msg: "Amount must be at least 5 characters."
    },
    {
      el: document.getElementById("buyerName"),
      min: 3,
      errorId: "buyerNameError",
      msg: "Buyer name must be at least 3 characters and contain only letters.",
      letterOnly: true
    },
    {
      el: document.getElementById("salesAgent"),
      min: 4,
      errorId: "salesAgentError",
      msg: "Sales agent name must be at least 4 characters and contain only letters.",
      letterOnly: true
    },
    {
      el: document.getElementById("saleDateTime"),
      min: 1,
      errorId: "saleDateTimeError",
      msg: "Please select a date and time."
    }
  ];

  let isValid = true;

  // Clear previous error messages and red borders
  fields.forEach(field => {
    document.getElementById(field.errorId).innerText = "";
    field.el.classList.remove("input-error");
  });

  document.getElementById("errorMsg").style.display = "none";
  document.getElementById("errorMsg").innerText = "";

  // Validate each field
  fields.forEach(field => {
    let value = field.el.value.trim();
    
    // Remove commas for amount field validation
    if (field.el.id === 'amount') {
      value = removeCommas(value);
    }
    
    if (value.length < field.min) {
      document.getElementById(field.errorId).innerText = field.msg;
      field.el.classList.add("input-error");
      isValid = false;
    } else if (field.letterOnly && !/^[A-Za-z\s]+$/.test(value)) {
      document.getElementById(field.errorId).innerText = "Only letters are allowed.";
      field.el.classList.add("input-error");
      isValid = false;
    }
  });

  // Show top error message if any field is invalid
  if (!isValid) {
    const topError = document.getElementById("errorMsg");
    topError.style.display = "block";
    topError.innerText = "Please correct the highlighted errors.";
  } else {
    // Remove commas before submission
    const amountField = document.getElementById("amount");
    amountField.value = removeCommas(amountField.value);
  }

  return isValid;
}
