document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("produceForm");

  const fields = {
    produceName: document.getElementById("produceName"),
    produceType: document.getElementById("produceType"),
    tonnage: document.getElementById("tonnage"),
    cost: document.getElementById("cost"),
    dealerName: document.getElementById("dealerName"),
    contact: document.getElementById("contact"),
    date: document.getElementById("date")
  };

  const errorSpans = {
    produceName: document.getElementById("produceNameError"),
    produceType: document.getElementById("produceTypeError"),
    tonnage: document.getElementById("tonnageError"),
    cost: document.getElementById("costError"),
    dealerName: document.getElementById("dealerNameError"),
    contact: document.getElementById("contactError"),
    date: document.getElementById("dateError")
  };

  const isAlphaNum = str => /^[A-Za-z0-9 ]+$/.test(str);
  const isNumeric = str => /^[0-9]+$/.test(str);
  const isPhone = num => /^\+256\d{9}$/.test(num);

  const clearErrors = () => {
    Object.values(fields).forEach(field => field.style.border = "");
    Object.values(errorSpans).forEach(span => span.textContent = "");
  };

  const setError = (fieldKey, message) => {
    fields[fieldKey].style.border = "2px solid red";
    errorSpans[fieldKey].textContent = message;
  };

  form.addEventListener("submit", e => {
    clearErrors();
    let isValid = true;

    const { produceName, produceType, tonnage, cost, dealerName, contact, date } = fields;

    if (!produceName.value.trim() || produceName.value.trim().length < 3 || !isAlphaNum(produceName.value.trim())) {
      setError("produceName", "At least 3 alphanumeric characters required.");
      isValid = false;
    }

    if (!produceType.value) {
      setError("produceType", "Please select a produce type.");
      isValid = false;
    }

    if (!tonnage.value || !isNumeric(tonnage.value) || tonnage.value.length < 3) {
      setError("tonnage", "Tonnage must be numeric and at least 3 digits.");
      isValid = false;
    }

    if (!cost.value || !isNumeric(cost.value) || cost.value.length < 5) {
      setError("cost", "Cost must be numeric and at least 5 digits.");
      isValid = false;
    }

    if (!dealerName.value.trim() || dealerName.value.trim().length < 4 || !isAlphaNum(dealerName.value.trim())) {
      setError("dealerName", "Dealer name must be alphanumeric and at least 4 characters.");
      isValid = false;
    }

    if (!contact.value || !isPhone(contact.value)) {
      setError("contact", "Use format +256XXXXXXXXX (13 characters).");
      isValid = false;
    }

    if (!date.value) {
      setError("date", "Date is required.");
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault(); // Stop form submission
    }
  });
});



