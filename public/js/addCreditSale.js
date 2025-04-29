function validateForm() {
      let valid = true;

      document.querySelectorAll('.error').forEach(e => e.innerText = '');

      const buyerName = document.getElementById('buyerName').value.trim();
      const nationalId = document.getElementById('nationalId').value.trim();
      const location = document.getElementById('location').value.trim();
      const contact = document.getElementById('contact').value.trim();
      const amountDue = parseFloat(document.getElementById('amountDue').value);
      const salesAgentName = document.getElementById('salesAgentName').value.trim();
      const dueDate = document.getElementById('dueDate').value;
      const produceName = document.getElementById('produceName').value.trim();
      const tonnage = parseFloat(document.getElementById('tonnage').value);
      const dispatchDate = document.getElementById('dispatchDate').value;

      if (buyerName.length < 2) {
        document.getElementById('buyerNameError').innerText = 'Must be at least 2 characters.';
        valid = false;
      }

      if (!/^[0-9]{10}$/.test(nationalId)) {
        document.getElementById('nationalIdError').innerText = 'NIN must be 10 digits.';
        valid = false;
      }

      if (location.length < 2) {
        document.getElementById('locationError').innerText = 'Location must be at least 2 characters.';
        valid = false;
      }

      if (!/^\+256\d{9}$/.test(contact)) {
        document.getElementById('contactError').innerText = 'Phone must start with +256 and have 12 digits.';
        valid = false;
      }

      if (isNaN(amountDue) || amountDue < 10000) {
        document.getElementById('amountDueError').innerText = 'Amount must be at least UGX 10,000.';
        valid = false;
      }

      if (salesAgentName.length < 2) {
        document.getElementById('salesAgentNameError').innerText = 'Must be at least 2 characters.';
        valid = false;
      }

      if (!dueDate) {
        document.getElementById('dueDateError').innerText = 'Please select a due date.';
        valid = false;
      }

      if (produceName.length < 2) {
        document.getElementById('produceNameError').innerText = 'Must be at least 2 characters.';
        valid = false;
      }

      if (document.getElementById('produceType').value === '') {
        document.getElementById('produceTypeError').innerText = 'Please select a produce type.';
        valid = false;
      }

      if (isNaN(tonnage) || tonnage <= 0) {
        document.getElementById('tonnageError').innerText = 'Tonnage must be a positive number.';
        valid = false;
      }

      if (!dispatchDate) {
        document.getElementById('dispatchDateError').innerText = 'Please select a dispatch date.';
        valid = false;
      }

      if (valid) {
        document.getElementById('formSuccess').innerText = '✅ Credit Sale successfully registered!';
        return false; // prevent real submission for demo
      }

      return false;
    }