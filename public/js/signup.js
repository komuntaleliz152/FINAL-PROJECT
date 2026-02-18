// Back button functionality
function goBack() {
  window.history.back();
}

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

  // Restrict password to 6 digits and validate in real-time
  password.addEventListener('input', function() {
    // Remove non-numeric characters
    this.value = this.value.replace(/\D/g, '');
    
    // Limit to 6 characters
    if (this.value.length > 6) {
      this.value = this.value.slice(0, 6);
    }

    // Real-time validation
    const passwordRegex = /^\d{6}$/;
    if (passwordRegex.test(this.value)) {
      // Valid password - green border
      this.classList.remove('error-border');
      this.classList.add('success-border');
      errorFields.password.innerText = '';
    } else if (this.value.length > 0) {
      // Invalid password - show error
      this.classList.remove('success-border');
      this.classList.add('error-border');
      if (this.value.length < 6) {
        errorFields.password.innerText = 'Password must be exactly 6 digits.';
      }
    } else {
      // Empty - reset
      this.classList.remove('error-border', 'success-border');
      errorFields.password.innerText = '';
    }
  });

  // Restrict confirm password to 6 digits and validate in real-time
  confirmPassword.addEventListener('input', function() {
    // Remove non-numeric characters
    this.value = this.value.replace(/\D/g, '');
    
    // Limit to 6 characters
    if (this.value.length > 6) {
      this.value = this.value.slice(0, 6);
    }

    // Real-time validation
    if (this.value === password.value && this.value.length === 6) {
      // Passwords match - green border
      this.classList.remove('error-border');
      this.classList.add('success-border');
      errorFields.confirmPassword.innerText = '';
    } else if (this.value.length > 0) {
      // Passwords don't match - show error
      this.classList.remove('success-border');
      this.classList.add('error-border');
      if (this.value.length === 6 && this.value !== password.value) {
        errorFields.confirmPassword.innerText = 'Passwords do not match.';
      }
    } else {
      // Empty - reset
      this.classList.remove('error-border', 'success-border');
      errorFields.confirmPassword.innerText = '';
    }
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

    // First Name Validation
    if (!nameRegex.test(firstName)) {
      errorFields.firstName.innerText = 'First name must start with a capital letter, contain only letters, and be at least 4 characters.';
      firstNameField.classList.add('error-border');
      isValid = false;
    }

    // Last Name Validation
    if (!nameRegex.test(lastName)) {
      errorFields.lastName.innerText = 'Last name must start with a capital letter, contain only letters, and be at least 4 characters.';
      lastNameField.classList.add('error-border');
      isValid = false;
    }

    // Email
    if (!emailRegex.test(email)) {
      errorFields.email.innerText = 'Please enter a valid email address.';
      emailField.classList.add('error-border');
      isValid = false;
    }

    // Password
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




