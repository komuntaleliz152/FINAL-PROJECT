document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');

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
      passwordError.textContent = '';
    } else if (this.value.length > 0) {
      // Invalid password - show error
      this.classList.remove('success-border');
      this.classList.add('error-border');
      if (this.value.length < 6) {
        passwordError.textContent = 'Password must be exactly 6 digits.';
      }
    } else {
      // Empty - reset
      this.classList.remove('error-border', 'success-border');
      passwordError.textContent = '';
    }
  });

  // Email validation on input
  email.addEventListener('input', function() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(this.value.trim())) {
      this.classList.remove('error-border');
      this.classList.add('success-border');
      emailError.textContent = '';
    } else if (this.value.length > 0) {
      this.classList.remove('success-border');
      emailError.textContent = '';
    } else {
      this.classList.remove('error-border', 'success-border');
      emailError.textContent = '';
    }
  });

  // Form submission validation
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Clear previous error messages and borders
    emailError.textContent = '';
    passwordError.textContent = '';
    email.classList.remove('error-border');
    password.classList.remove('error-border');

    let hasError = false;

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.value.trim() === '') {
      emailError.textContent = 'Email is required.';
      email.classList.add('error-border');
      hasError = true;
    } else if (!emailRegex.test(email.value.trim())) {
      emailError.textContent = 'Please enter a valid email address.';
      email.classList.add('error-border');
      hasError = true;
    }

    // Validate password: exactly 6 digits, numbers only
    const pwd = password.value.trim();
    if (pwd === '') {
      passwordError.textContent = 'Password is required.';
      password.classList.add('error-border');
      hasError = true;
    } else if (!/^\d{6}$/.test(pwd)) {
      passwordError.textContent = 'Password must be exactly 6 digits (numbers only).';
      password.classList.add('error-border');
      hasError = true;
    }

    if (!hasError) {
      this.submit();
    }
  });
});
