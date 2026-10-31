import { apiLogin, apiForgotPassword, apiGetMe } from './api.js';
import { showToast } from './toast.js';

document.addEventListener('DOMContentLoaded', async () => {
  // If already authenticated, redirect to app dashboard
  try {
    const user = await apiGetMe();
    if (user && user.email) {
      window.location.href = '/index.html';
      return;
    }
  } catch {
    // not logged in
  }

  const form = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const togglePwdBtn = document.getElementById('toggle-pwd');
  const alertBox = document.getElementById('alert-box');
  const submitBtn = document.getElementById('submit-btn');
  const demoStudentBtn = document.getElementById('demo-student-btn');

  // Toggle Password
  togglePwdBtn.addEventListener('click', () => {
    const isPwd = passwordInput.type === 'password';
    passwordInput.type = isPwd ? 'text' : 'password';
    togglePwdBtn.textContent = isPwd ? 'Hide' : 'Show';
  });

  // Demo auto-fill
  demoStudentBtn.addEventListener('click', () => {
    emailInput.value = 'student@skillsync.edu';
    passwordInput.value = 'Student@123';
    alertBox.style.display = 'none';
  });

  // Handle Login Submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    alertBox.style.display = 'none';

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
      alertBox.textContent = 'Please provide both email and password.';
      alertBox.style.display = 'block';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Signing in...';

    try {
      const result = await apiLogin({ email, password });
      showToast(`Welcome back, ${result.user.name}!`, 'success');
      setTimeout(() => {
        window.location.href = '/index.html';
      }, 500);
    } catch (err) {
      alertBox.textContent = err.message || 'Invalid email or password.';
      alertBox.style.display = 'block';
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Sign In to SkillSync</span> &rarr;';
    }
  });

  // Forgot Password Modal
  const forgotLink = document.getElementById('forgot-link');
  const forgotModal = document.getElementById('forgot-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const cancelModalBtn = document.getElementById('cancel-modal-btn');
  const forgotForm = document.getElementById('forgot-form');
  const forgotAlert = document.getElementById('forgot-alert');
  const resetEmailInput = document.getElementById('reset-email');
  const newPasswordInput = document.getElementById('new-password');
  const confirmNewPasswordInput = document.getElementById('confirm-new-password');

  forgotLink.addEventListener('click', (e) => {
    e.preventDefault();
    forgotAlert.style.display = 'none';
    forgotModal.style.display = 'flex';
    if (emailInput.value) {
      resetEmailInput.value = emailInput.value;
    }
  });

  const closeModal = () => {
    forgotModal.style.display = 'none';
  };

  closeModalBtn.addEventListener('click', closeModal);
  cancelModalBtn.addEventListener('click', closeModal);

  forgotForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    forgotAlert.style.display = 'none';

    const email = resetEmailInput.value.trim();
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmNewPasswordInput.value;

    if (newPassword.length < 6 || !/[a-zA-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      forgotAlert.textContent = 'Password must be at least 6 characters with letters and numbers.';
      forgotAlert.style.display = 'block';
      return;
    }

    if (newPassword !== confirmPassword) {
      forgotAlert.textContent = 'Passwords do not match.';
      forgotAlert.style.display = 'block';
      return;
    }

    try {
      const res = await apiForgotPassword({ email, newPassword });
      showToast(res.message || 'Password updated! You can now log in.', 'success');
      closeModal();
      passwordInput.value = newPassword;
      emailInput.value = email;
    } catch (err) {
      forgotAlert.textContent = err.message || 'Failed to update password.';
      forgotAlert.style.display = 'block';
    }
  });
});
