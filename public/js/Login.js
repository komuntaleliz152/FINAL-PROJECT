document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('email');
    const password = document.getElementById('password');
    const rememberMe = document.getElementById('rememberMe').checked;
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');

    // Clear old error messages
    usernameError.textContent = '';
    passwordError.textContent = '';

    let hasError = false;

    if (email.value.trim() === '') {
        emailError.textContent = 'Email is required.';
        hasError = true;
    }

    if (password.value.trim() === '') {
        passwordError.textContent = 'Password is required.';
        hasError = true;
    } else if (password.value.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters.';
        hasError = true;
    }

    if (!hasError) {
        alert(`Username: ${username.value}\nPassword: ${password.value}\nRemember Me: ${rememberMe}`);
    }
});



