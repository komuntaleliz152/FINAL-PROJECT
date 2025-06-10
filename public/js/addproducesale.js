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
    const value = field.el.value.trim();
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
  }

  return isValid;
}
