document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signupForm');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');

  const firstNameField = document.getElementById('firstName');
  const lastNameField = document.getElementById('lastName');
  const emailField = document.getElementById('email');
  const roleField = document.getElementById('role');
  const branchField = document.getElementById('branchName');

  const errorFields = {
    firstName: document.getElementById('firstNameError'),
    lastName: document.getElementById('lastNameError'),
    email: document.getElementById('emailError'),
    password: document.getElementById('passwordError'),
    confirmPassword: document.getElementById('confirmPasswordError'),
    role: document.getElementById('roleError'),
    branch: document.getElementById('branchError')
  };

  // Auto-capitalize first letter of names
  [firstNameField, lastNameField].forEach(field => {
    field.addEventListener('input', () => {
      const val = field.value;
      if (val.length > 0) {
        field.value = val.charAt(0).toUpperCase() + val.slice(1);
      }
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let isValid = true;

    // Clear all previous errors
    Object.entries(errorFields).forEach(([key, el]) => {
      el.innerText = '';
      const inputEl = document.getElementById(key);
      if (inputEl) inputEl.classList.remove('error-border');
    });

    const firstName = firstNameField.value.trim();
    const lastName = lastNameField.value.trim();
    const email = emailField.value.trim();
    const role = roleField.value;
    const branch = branchField.value;
    const pwd = password.value.trim();
    const confirmPwd = confirmPassword.value.trim();

    const nameRegex = /^[A-Z][a-zA-Z]{3,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^\d{6}$/;

    // First Name
    if (!nameRegex.test(firstName)) {
      errorFields.firstName.innerText = 'First name must start with a capital letter and be at least 4 characters.';
      firstNameField.classList.add('error-border');
      isValid = false;
    }

    // Last Name
    if (!nameRegex.test(lastName)) {
      errorFields.lastName.innerText = 'Last name must start with a capital letter and be at least 4 characters.';
      lastNameField.classList.add('error-border');
      isValid = false;
    }

    // Email
    if (!emailRegex.test(email)) {
      errorFields.email.innerText = 'Please enter a valid email address.';
      emailField.classList.add('error-border');
      isValid = false;
    }

    // Password (must be exactly 6 digits)
    if (!passwordRegex.test(pwd)) {
      errorFields.password.innerText = 'Password must be exactly 6 digits (numbers only).';
      password.classList.add('error-border');
      isValid = false;
    }

    // Confirm Password
    if (pwd !== confirmPwd) {
      errorFields.confirmPassword.innerText = 'Passwords do not match.';
      confirmPassword.classList.add('error-border');
      isValid = false;
    }

    // Role
    if (!role) {
      errorFields.role.innerText = 'Please select a role.';
      roleField.classList.add('error-border');
      isValid = false;
    }

    // Branch
    if (branch === 'select' || !branch) {
      errorFields.branch.innerText = 'Please select a branch.';
      branchField.classList.add('error-border');
      isValid = false;
    }

    if (isValid) {
      form.submit();
    }
  });
});



