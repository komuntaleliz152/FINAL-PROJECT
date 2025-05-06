function validateForm() {
  let valid = true;

  document.querySelectorAll('.error').forEach(e => e.innerText = '');

  const buyerName = document.getElementById('buyerName').value.trim();
  const nationalId = document.getElementById('nationalId').value.trim();
  const location = document.getElementById('location').value.trim();
  const contactRaw = document.getElementById('contact').value.trim();
  const contact = contactRaw.replace(/\s/g, ''); // remove spaces
  const amountDueRaw = document.getElementById('amountDue').value.trim();
  const amountDue = parseFloat(amountDueRaw);
  const salesAgentName = document.getElementById('salesAgentName').value.trim();
  const dueDate = document.getElementById('dueDate')?.value;
  const produceName = document.getElementById('produceName').value.trim();
  const tonnageRaw = document.getElementById('tonnage').value.trim();
  const tonnage = parseFloat(tonnageRaw);
  const dispatchDate = document.getElementById('dispatchDate').value;

  // Buyer Name
  if (buyerName.length < 2) {
    document.getElementById('buyerNameError').innerText = 'Must be at least 2 characters.';
    valid = false;
  }

  // NIN Validation: Starts with 2 uppercase letters followed by 11 digits (total 13)
  if (!/^[A-Z]{2}[0-9]{11}$/.test(nationalId)) {
    document.getElementById('nationalIdError').innerText = 'NIN must start with 2 capital letters followed by 11 digits.';
    valid = false;
  }

  // Location
  if (location.length < 2) {
    document.getElementById('locationError').innerText = 'Location must be at least 2 characters.';
    valid = false;
  }

  // Phone Number
  if (!/^\+256\d{9}$/.test(contact)) {
    document.getElementById('contactError').innerText =
      'Phone must start with +256 and be followed by 9 digits (e.g. +256701234567).';
    valid = false;
  }

  // Amount Due
  if (amountDueRaw.length < 5) {
    document.getElementById('amountDueError').innerText = 'Amount Due must be at least 5 characters.';
    valid = false;
  } else if (isNaN(amountDue) || amountDue < 10000) {
    document.getElementById('amountDueError').innerText = 'Amount Due must be at least UGX 10,000.';
    valid = false;
  }

  // Sales Agent Name
  if (salesAgentName.length < 2) {
    document.getElementById('salesAgentNameError').innerText = 'Must be at least 2 characters.';
    valid = false;
  }

  // Due Date (optional in your form — handled only if element exists)
  if (!dueDate && document.getElementById('dueDate')) {
    document.getElementById('dueDateError').innerText = 'Please select a due date.';
    valid = false;
  }

  // Produce Name
  if (produceName.length < 2) {
    document.getElementById('produceNameError').innerText = 'Must be at least 2 characters.';
    valid = false;
  }

  // Produce Type
  if (document.getElementById('produceType').value === '') {
    document.getElementById('produceTypeError').innerText = 'Please select a produce type.';
    valid = false;
  }

  // Tonnage
  if (tonnageRaw.length < 3) {
    document.getElementById('tonnageError').innerText = 'Tonnage must be at least 3 characters.';
    valid = false;
  } else if (isNaN(tonnage) || tonnage <= 0) {
    document.getElementById('tonnageError').innerText = 'Tonnage must be a valid positive number.';
    valid = false;
  }

  // Dispatch Date
  if (!dispatchDate) {
    document.getElementById('dispatchDateError').innerText = 'Please select a dispatch date.';
    valid = false;
  }

  // Final check
  if (valid) {
    document.getElementById('formSuccess').innerText = '✅ Credit Sale successfully registered!';
    return true; 
  }

  // return false; prevent submission if not valid
}
