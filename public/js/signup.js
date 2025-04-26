  const form = document.getElementById("signupForm");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const passwordError = document.getElementById("passwordError");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (password.value !== confirmPassword.value) {
        passwordError.textContent = "Passwords do not match!";
        return;
      } else {
        passwordError.textContent = "";
      }

      const userData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        password: password.value,
        role: document.getElementById("role").value,
        branchName: document.getElementById("branchName").value,
      };

      alert("Signup successful!\nWelcome, " + userData.firstName + "!");
      console.log("User Data:", userData);

      form.reset();
    });
  
    