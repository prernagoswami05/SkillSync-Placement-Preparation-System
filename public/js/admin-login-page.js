import { apiAdminLogin, apiGetMe } from './api.js';
import { showToast } from './toast.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const user = await apiGetMe();
    if (user && user.isAdmin) {
      window.location.href = '/index.html';
      return;
    }
  } catch {
    // not logged in
  }

  const form = document.getElementById('admin-login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const togglePwdBtn = document.getElementById('toggle-pwd');
  const alertBox = document.getElementById('alert-box');
  const submitBtn = document.getElementById('submit-btn');
  const demoAdminBtn = document.getElementById('demo-admin-btn');

  togglePwdBtn.addEventListener('click', () => {
    const isPwd = passwordInput.type === 'password';
    passwordInput.type = isPwd ? 'text' : 'password';
    togglePwdBtn.textContent = isPwd ? 'Hide' : 'Show';
  });

  demoAdminBtn.addEventListener('click', () => {
    emailInput.value = 'admin@skillsync.edu';
    passwordInput.value = 'Admin@SkillSync2026';
    alertBox.style.display = 'none';
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    alertBox.style.display = 'none';

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    if (!email || !password) {
      alertBox.textContent = 'Administrator email and password are required.';
      alertBox.style.display = 'block';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Verifying admin authorization...';

    try {
      const result = await apiAdminLogin({ email, password });
      showToast('Admin authorization granted.', 'success');
      setTimeout(() => {
        window.location.href = '/index.html';
      }, 500);
    } catch (err) {
      alertBox.textContent = err.message || 'Access denied: Invalid administrator credentials.';
      alertBox.style.display = 'block';
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Authorize Administrator Access</span> &rarr;';
    }
  });
});
