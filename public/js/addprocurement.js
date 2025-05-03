// document.getElementById("produceForm").addEventListener("submit", function (e) {
  // e.preventDefault

  const produceName = document.getElementById("produceName").value.trim();
  const produceType = document.getElementById("produceType").value.trim();
  const date = document.getElementById("date").value;
  const tonnage = document.getElementById("tonnage").value;
  const cost = document.getElementById("cost").value;
  const dealerName = document.getElementById("dealerName").value.trim();
  const contact = document.getElementById("contact").value.trim();

  const errorMsg = document.getElementById("errorMsg");
  errorMsg.textContent = "";

  const isAlpha = str => /^[A-Za-z]+$/.test(str);
  const isAlphaNum = str => /^[A-Za-z0-9 ]+$/.test(str);
  const isPhone = num => /^(\+256|0)[0-9]{9}$/.test(num);

  if (!isAlphaNum(produceName)) {
    errorMsg.textContent = "Produce name must be alphanumeric.";
    return;
  }

  if (!isAlpha(produceType) || produceType.length < 2) {
    errorMsg.textContent = "Type must be letters only and at least 2 characters.";
    return;
  }

  if (!date) {
    errorMsg.textContent = "Date is required.";
    return;
  }

  if (!tonnage || tonnage.length < 3) {
    errorMsg.textContent = "Tonnage must be numeric and at least 3 digits.";
    return;
  }

  if (!cost || cost.length < 5) {
    errorMsg.textContent = "Cost must be at least 5 digits.";
    return;
  }

  if (!isAlphaNum(dealerName) || dealerName.length < 2) {
    errorMsg.textContent = "Dealer name must be alphanumeric and at least 2 characters.";
    return;
  }

  if (!isPhone(contact)) {
    errorMsg.textContent = "Enter a valid Ugandan phone number.";
    return;
  }

  alert("Produce record submitted successfully!");
  this.reset();

