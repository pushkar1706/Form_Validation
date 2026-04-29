// ===== AUTO-CALCULATE AGE FROM DOB =====
const dobInput = document.getElementById("dob");
const ageInput = document.getElementById("age");

dobInput.addEventListener("change", () => {
  const dob = new Date(dobInput.value);
  if (!dobInput.value) {
    ageInput.value = "";
    return;
  }

  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  ageInput.value = age >= 0 ? age : "";
});

// ===== TOGGLE PASSWORD VISIBILITY =====
document.querySelectorAll(".eye-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-target");
    const input = document.getElementById(targetId);
    if (input.type === "password") {
      input.type = "text";
      btn.style.opacity = "1";
    } else {
      input.type = "password";
      btn.style.opacity = "0.5";
    }
  });
});

// ===== VALIDATION HELPERS =====
function showError(msg) {
  document.getElementById("errorMsg").textContent = msg;
}

function clearError() {
  document.getElementById("errorMsg").textContent = "";
}

function markField(input, valid) {
  input.classList.remove("valid", "invalid");
  input.classList.add(valid ? "valid" : "invalid");
}

// ===== FORM SUBMISSION =====
document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  clearError();

  const prefix = document.getElementById("prefix").value;
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const username = document.getElementById("username").value.trim();
  const dob = document.getElementById("dob").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const contact = document.getElementById("contact").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPass = document.getElementById("confirmPassword").value;

  let valid = true;

  // Prefix
  if (!prefix) {
    showError("Please select a prefix.");
    return;
  }

  // First name
  if (!firstName) {
    markField(document.getElementById("firstName"), false);
    showError("First name is required.");
    return;
  } else {
    markField(document.getElementById("firstName"), true);
  }

  // Last name
  if (!lastName) {
    markField(document.getElementById("lastName"), false);
    showError("Last name is required.");
    return;
  } else {
    markField(document.getElementById("lastName"), true);
  }

  // Username: alphanumeric + underscore only
  if (!username || !/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
    markField(document.getElementById("username"), false);
    showError(
      "Username must be 3–20 characters (letters, numbers, underscore).",
    );
    return;
  } else {
    markField(document.getElementById("username"), true);
  }

  // DOB
  if (!dob) {
    markField(document.getElementById("dob"), false);
    showError("Date of birth is required.");
    return;
  } else {
    markField(document.getElementById("dob"), true);
  }

  // Age must be >= 13
  if (!age || parseInt(age) < 13) {
    markField(document.getElementById("dob"), false);
    showError("You must be at least 13 years old to register.");
    return;
  }

  // Gender
  if (!gender) {
    showError("Please select a gender.");
    return;
  }

  // Contact: basic phone check (7-15 digits, optional + and spaces)
  const contactClean = contact.replace(/[\s\-()]/g, "");
  if (!contact || !/^\+?\d{7,15}$/.test(contactClean)) {
    markField(document.getElementById("contact"), false);
    showError("Enter a valid contact number.");
    return;
  } else {
    markField(document.getElementById("contact"), true);
  }

  // Email
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    markField(document.getElementById("email"), false);
    showError("Enter a valid email address.");
    return;
  } else {
    markField(document.getElementById("email"), true);
  }

  // Password: at least 8 chars, 1 uppercase, 1 digit
  if (!password || !/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
    markField(document.getElementById("password"), false);
    showError(
      "Password must be 8+ characters with at least one uppercase letter and one number.",
    );
    return;
  } else {
    markField(document.getElementById("password"), true);
  }

  // Confirm password
  if (password !== confirmPass) {
    markField(document.getElementById("confirmPassword"), false);
    showError("Passwords do not match.");
    return;
  } else {
    markField(document.getElementById("confirmPassword"), true);
  }

  // All good
  clearError();
  alert(
    `Welcome, ${prefix} ${firstName} ${lastName}! Your account has been created.`,
  );
  document.getElementById("registerForm").reset();
  document
    .querySelectorAll("input, select")
    .forEach((el) => el.classList.remove("valid", "invalid"));
});
