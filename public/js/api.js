// SkillSync Vanilla JavaScript API Client
const TOKEN_KEY = 'skillsync_auth_jwt_token';
const USER_KEY = 'skillsync_auth_user_cache';

export function getAuthToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAuthToken(token) {
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  } catch {
    // ignore
  }
}

export function getCachedUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCachedUser(user) {
  try {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  } catch {
    // ignore
  }
}

export async function apiFetch(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(endpoint, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || `HTTP error ${response.status}`);
  }

  return data;
}

// ==========================================
// AUTHENTICATION APIS
// ==========================================

export async function apiRegister({ name, email, password, role }) {
  const result = await apiFetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, role }),
  });
  if (result.token && result.user) {
    setAuthToken(result.token);
    setCachedUser(result.user);
  }
  return result;
}

export async function apiLogin({ email, password }) {
  const result = await apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  if (result.token && result.user) {
    setAuthToken(result.token);
    setCachedUser(result.user);
  }
  return result;
}

export async function apiAdminLogin({ email, password }) {
  const result = await apiFetch('/api/auth/admin/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  if (result.token && result.user) {
    setAuthToken(result.token);
    setCachedUser(result.user);
  }
  return result;
}

export async function apiForgotPassword({ email, newPassword }) {
  return await apiFetch('/api/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email, newPassword }),
  });
}

export async function apiGetMe() {
  const token = getAuthToken();
  if (!token) return null;
  try {
    const result = await apiFetch('/api/auth/me');
    if (result.user) {
      setCachedUser(result.user);
      return result.user;
    }
  } catch (err) {
    console.warn('Session verification error:', err.message);
  }
  return getCachedUser();
}

export function apiLogout() {
  setAuthToken(null);
  setCachedUser(null);
}

// ==========================================
// ASSESSMENT & QUESTIONS APIS
// ==========================================

export async function apiGetSubjects() {
  return await apiFetch('/api/subjects');
}

export async function apiGetQuestions(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== 'all') {
      query.set(k, String(v));
    }
  });
  return await apiFetch(`/api/questions?${query.toString()}`);
}

export async function apiGetWeakAreaQuestions(limit = 10) {
  return await apiFetch(`/api/questions/weak-areas?limit=${limit}`);
}

export async function apiSubmitAssessment(attemptData) {
  return await apiFetch('/api/assessments/submit', {
    method: 'POST',
    body: JSON.stringify(attemptData),
  });
}

export async function apiGetAssessmentHistory(userId) {
  const query = userId ? `?userId=${encodeURIComponent(userId)}` : '';
  const result = await apiFetch(`/api/assessments/history${query}`);
  return result.attempts || [];
}

export async function apiGetAssessmentById(id) {
  const result = await apiFetch(`/api/assessments/${id}`);
  return result.attempt || null;
}

export async function apiGetPlacementData() {
  return await apiFetch('/api/placement/data');
}

// ==========================================
// ADMIN QUESTION APIS
// ==========================================

export async function apiAddQuestion(questionData) {
  const result = await apiFetch('/api/admin/questions', {
    method: 'POST',
    body: JSON.stringify(questionData),
  });
  return result.question;
}

export async function apiUpdateQuestion(id, questionData) {
  const result = await apiFetch(`/api/admin/questions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(questionData),
  });
  return result.question;
}

export async function apiDeleteQuestion(id) {
  return await apiFetch(`/api/admin/questions/${id}`, {
    method: 'DELETE',
  });
}
