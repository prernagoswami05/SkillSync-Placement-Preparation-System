import { apiRegister, apiGetMe } from './api.js';
import { showToast } from './toast.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const user = await apiGetMe();
    if (user && user.email) {
      window.location.href = '/index.html';
      return;
    }
  } catch {
    // not logged in
  }

  const form = document.getElementById('register-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const roleSelect = document.getElementById('role');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm-password');
  const togglePwdBtn = document.getElementById('toggle-pwd');
  const alertBox = document.getElementById('alert-box');
  const submitBtn = document.getElementById('submit-btn');
  const matchMsg = document.getElementById('match-msg');

  const strengthBars = [
    document.getElementById('bar-1'),
    document.getElementById('bar-2'),
    document.getElementById('bar-3'),
    document.getElementById('bar-4'),
  ];
  const strengthText = document.getElementById('strength-text');
  const strengthReq = document.getElementById('strength-req');

  // Toggle Password
  togglePwdBtn.addEventListener('click', () => {
    const isPwd = passwordInput.type === 'password';
    passwordInput.type = isPwd ? 'text' : 'password';
    confirmPasswordInput.type = isPwd ? 'text' : 'password';
    togglePwdBtn.textContent = isPwd ? 'Hide' : 'Show';
  });

  // Calculate Password Strength
  const evaluateStrength = (pass) => {
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 10) score++;
    if (/[a-zA-Z]/.test(pass) && /[0-9]/.test(pass)) score++;
    if (/[^a-zA-Z0-9]/.test(pass)) score++;
    return score;
  };

  const updateStrengthUI = () => {
    const pass = passwordInput.value;
    if (!pass) {
      strengthBars.forEach((bar) => (bar.style.backgroundColor = 'var(--border)'));
      strengthText.textContent = 'Strength: Too short';
      strengthReq.textContent = 'Needs letter & number';
      strengthReq.style.color = 'var(--text-muted)';
      return;
    }

    const score = evaluateStrength(pass);
    const labels = ['Too short', 'Weak', 'Good', 'Strong', 'Very strong'];
    const colors = ['#e2e8f0', '#ef4444', '#f59e0b', '#10b981', '#059669'];

    strengthBars.forEach((bar, idx) => {
      bar.style.backgroundColor = idx < score ? colors[score] : 'var(--border)';
    });

    strengthText.textContent = `Strength: ${labels[score]}`;

    const validChars = /[a-zA-Z]/.test(pass) && /[0-9]/.test(pass) && pass.length >= 6;
    if (validChars) {
      strengthReq.textContent = '✓ Valid format';
      strengthReq.style.color = '#059669';
    } else {
      strengthReq.textContent = 'Needs letter & number';
      strengthReq.style.color = 'var(--text-muted)';
    }
  };

  passwordInput.addEventListener('input', () => {
    updateStrengthUI();
    checkPasswordMatch();
  });

  // Confirm password match checking
  const checkPasswordMatch = () => {
    const pass = passwordInput.value;
    const confirm = confirmPasswordInput.value;
    if (!confirm) {
      matchMsg.textContent = '';
      return;
    }
    if (pass === confirm) {
      matchMsg.textContent = '✓ Passwords match';
      matchMsg.style.color = '#059669';
    } else {
      matchMsg.textContent = '✗ Passwords do not match';
      matchMsg.style.color = '#dc2626';
    }
  };

  confirmPasswordInput.addEventListener('input', checkPasswordMatch);

  // Handle Register Submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    alertBox.style.display = 'none';

    const name = nameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const role = roleSelect.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (name.length < 2) {
      alertBox.textContent = 'Please enter your full name (minimum 2 characters).';
      alertBox.style.display = 'block';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alertBox.textContent = 'Please provide a valid email address.';
      alertBox.style.display = 'block';
      return;
    }

    if (password.length < 6 || !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      alertBox.textContent = 'Password must be at least 6 characters and contain letters and numbers.';
      alertBox.style.display = 'block';
      return;
    }

    if (password !== confirmPassword) {
      alertBox.textContent = 'Passwords do not match.';
      alertBox.style.display = 'block';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Registering account...';

    try {
      const result = await apiRegister({ name, email, password, role });
      showToast('Registration successful! Welcome to SkillSync.', 'success');
      setTimeout(() => {
        window.location.href = '/index.html';
      }, 500);
    } catch (err) {
      alertBox.textContent = err.message || 'Registration failed. Please try again.';
      alertBox.style.display = 'block';
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Complete Registration</span> &rarr;';
    }
  });
});
