document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const rememberMe = document.getElementById('rememberMe')?.checked;

  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');

  // Clear previous error messages and red borders
  emailError.textContent = '';
  passwordError.textContent = '';
  email.classList.remove('error-border');
  password.classList.remove('error-border');

  let hasError = false;

  // Validate email with strict pattern
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
    alert(`Email: ${email.value}\nPassword: ${pwd}\nRemember Me: ${rememberMe}`);
     this.submit(); // Uncomment when ready to submit the form
  }
});


  



