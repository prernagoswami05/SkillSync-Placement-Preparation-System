import {
  apiGetSubjects,
  apiGetQuestions,
  apiGetWeakAreaQuestions,
  apiSubmitAssessment,
  apiGetAssessmentAccess,
} from './api.js';
import { showToast } from './toast.js';

export class AssessmentEngine {
  constructor({ onComplete, onPracticeTopic }) {
    this.onComplete = onComplete;
    this.onPracticeTopic = onPracticeTopic;

    this.subjects = [];
    this.activeMode = 'topic_practice';
    this.selectedSubject = 'Data Structures and Algorithms (DSA)';
    this.selectedTopic = 'all';
    this.selectedDifficulty = 'all';
    this.selectedCompany = 'TCS';
    this.questionCount = 10;

    // Test session state
    this.status = 'setup'; // setup, testing, finished
    this.questions = [];
    this.currentIndex = 0;
    this.answers = {}; // questionId: selectedOption (0,1,2,3 or null)
    this.markedForReview = new Set();
    this.timeSpent = {}; // questionId: seconds
    this.totalTimeSeconds = 0;
    this.timerInterval = null;
    this.timeRemaining = 0;

    this.init();
  }

  async init() {
    try {
      const data = await apiGetSubjects();
      this.subjects = data.subjects || [];
    } catch (err) {
      console.warn('Error loading subjects:', err);
    }
    this.render();
  }

  render() {
    const container = document.getElementById('assessment-view-container');
    if (!container) return;

    if (this.status === 'setup') {
      container.innerHTML = this.renderSetupHTML();
      this.bindSetupEvents();
    } else if (this.status === 'testing') {
      container.innerHTML = this.renderTestingHTML();
      this.bindTestingEvents();
    }
  }

  renderSetupHTML() {
    const activeSub = this.subjects.find((s) => s.name === this.selectedSubject);
    const topics = activeSub ? activeSub.topics : [];

    return `
      <div>
        <div style="margin-bottom: 1.5rem;">
          <h2 style="font-size: 1.375rem; margin-bottom: 0.375rem;">Placement Assessment Engine</h2>
          <p style="font-size: 0.875rem; color: var(--text-muted);">
            Choose an assessment mode to practice topic-wise, attempt full placement mocks, or prepare company-specific tests.
          </p>
        </div>

        <!-- Mode Selection Tabs -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; margin-bottom: 1.5rem;">
          <button type="button" class="mode-tab-btn card ${this.activeMode === 'topic_practice' ? 'active-mode' : ''}" data-mode="topic_practice" style="padding: 1rem; text-align: left; cursor: pointer; border: 2px solid ${this.activeMode === 'topic_practice' ? 'var(--accent)' : 'var(--border)'}; background: ${this.activeMode === 'topic_practice' ? 'var(--accent-light)' : '#ffffff'};">
            <div style="font-size: 0.8125rem; font-weight: 700; color: ${this.activeMode === 'topic_practice' ? 'var(--primary)' : 'var(--text-main)'};">Mode A: Topic-wise Practice</div>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">Custom topic, subject, & difficulty level</div>
          </button>

          <button type="button" class="mode-tab-btn card ${this.activeMode === 'mock_test' ? 'active-mode' : ''}" data-mode="mock_test" style="padding: 1rem; text-align: left; cursor: pointer; border: 2px solid ${this.activeMode === 'mock_test' ? 'var(--accent)' : 'var(--border)'}; background: ${this.activeMode === 'mock_test' ? 'var(--accent-light)' : '#ffffff'};">
            <div style="font-size: 0.8125rem; font-weight: 700; color: ${this.activeMode === 'mock_test' ? 'var(--primary)' : 'var(--text-main)'};">Mode B: Full Placement Mock</div>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">20 mixed questions, 25-min countdown</div>
          </button>

          <button type="button" class="mode-tab-btn card ${this.activeMode === 'company_pattern' ? 'active-mode' : ''}" data-mode="company_pattern" style="padding: 1rem; text-align: left; cursor: pointer; border: 2px solid ${this.activeMode === 'company_pattern' ? 'var(--accent)' : 'var(--border)'}; background: ${this.activeMode === 'company_pattern' ? 'var(--accent-light)' : '#ffffff'};">
            <div style="font-size: 0.8125rem; font-weight: 700; color: ${this.activeMode === 'company_pattern' ? 'var(--primary)' : 'var(--text-main)'};">Mode C: Company Pattern</div>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">TCS, Infosys, Wipro, Accenture patterns</div>
          </button>

          <button type="button" class="mode-tab-btn card ${this.activeMode === 'coding_debugging' ? 'active-mode' : ''}" data-mode="coding_debugging" style="padding: 1rem; text-align: left; cursor: pointer; border: 2px solid ${this.activeMode === 'coding_debugging' ? 'var(--accent)' : 'var(--border)'}; background: ${this.activeMode === 'coding_debugging' ? 'var(--accent-light)' : '#ffffff'};">
            <div style="font-size: 0.8125rem; font-weight: 700; color: ${this.activeMode === 'coding_debugging' ? 'var(--primary)' : 'var(--text-main)'};">Mode D: Coding &amp; Debugging</div>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">Code output &amp; bug detection</div>
          </button>

          <button type="button" class="mode-tab-btn card ${this.activeMode === 'weak_area' ? 'active-mode' : ''}" data-mode="weak_area" style="padding: 1rem; text-align: left; cursor: pointer; border: 2px solid ${this.activeMode === 'weak_area' ? 'var(--accent)' : 'var(--border)'}; background: ${this.activeMode === 'weak_area' ? 'var(--accent-light)' : '#ffffff'};">
            <div style="font-size: 0.8125rem; font-weight: 700; color: ${this.activeMode === 'weak_area' ? 'var(--primary)' : 'var(--text-main)'};">Mode E: Weak Area Drill</div>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">Auto-generated test on topics &lt; 65%</div>
          </button>
        </div>

        <!-- Mode Specific Configuration Form -->
        <div class="card" style="padding: 1.5rem;">
          ${this.renderModeFormHTML(topics)}
          <div style="margin-top: 1.5rem; display: flex; justify-content: flex-end;">
            <button type="button" id="start-test-btn" class="btn btn-primary" style="padding: 0.75rem 2rem; font-size: 0.9375rem;">
              <span>Start Assessment</span> &rarr;
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderModeFormHTML(topics) {
    if (this.activeMode === 'topic_practice') {
      return `
        <h3 style="font-size: 1rem; margin-bottom: 1rem;">Configure Topic-wise Assessment</h3>
        <div class="grid-cols-2" style="margin-bottom: 1rem;">
          <div class="form-group">
            <label class="form-label">Subject</label>
            <select id="config-subject" class="form-control">
              ${this.subjects
                .map(
                  (s) =>
                    `<option value="${s.name}" ${s.name === this.selectedSubject ? 'selected' : ''}>${s.name} (${s.questionCount} Qs)</option>`
                )
                .join('')}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Topic</label>
            <select id="config-topic" class="form-control">
              <option value="all">All Topics in Subject</option>
              ${topics
                .map(
                  (t) =>
                    `<option value="${t}" ${t === this.selectedTopic ? 'selected' : ''}>${t}</option>`
                )
                .join('')}
            </select>
          </div>
        </div>

        <div class="grid-cols-2">
          <div class="form-group">
            <label class="form-label">Difficulty Level</label>
            <select id="config-difficulty" class="form-control">
              <option value="all" ${this.selectedDifficulty === 'all' ? 'selected' : ''}>All Difficulties (Mixed)</option>
              <option value="beginner" ${this.selectedDifficulty === 'beginner' ? 'selected' : ''}>Beginner</option>
              <option value="intermediate" ${this.selectedDifficulty === 'intermediate' ? 'selected' : ''}>Intermediate</option>
              <option value="advanced" ${this.selectedDifficulty === 'advanced' ? 'selected' : ''}>Advanced</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Question Count</label>
            <select id="config-count" class="form-control">
              <option value="5" ${this.questionCount === 5 ? 'selected' : ''}>5 Questions (~6 mins)</option>
              <option value="10" ${this.questionCount === 10 ? 'selected' : ''}>10 Questions (~12 mins)</option>
              <option value="15" ${this.questionCount === 15 ? 'selected' : ''}>15 Questions (~18 mins)</option>
              <option value="20" ${this.questionCount === 20 ? 'selected' : ''}>20 Questions (~25 mins)</option>
            </select>
          </div>
        </div>
      `;
    }

    if (this.activeMode === 'mock_test') {
      return `
        <h3 style="font-size: 1rem; margin-bottom: 0.5rem;">Full Placement Mock Examination</h3>
        <p style="font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 1rem;">
          Simulates real technical campus hiring drives. Contains 20 balanced questions covering DSA, DBMS, OS, Networks, Programming, and Quantitative Reasoning.
        </p>
        <div style="background: var(--bg-main); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border);">
          <ul style="font-size: 0.8125rem; color: var(--text-sub); margin-left: 1.25rem; line-height: 1.7;">
            <li>Total Questions: <strong>20 Questions</strong></li>
            <li>Time Limit: <strong>25 Minutes (Countdown Timer)</strong></li>
            <li>Marking: +1 for correct, 0 for skipped/unanswered</li>
            <li>Detailed diagnostic report generated immediately upon submission</li>
          </ul>
        </div>
      `;
    }

    if (this.activeMode === 'company_pattern') {
      return `
        <h3 style="font-size: 1rem; margin-bottom: 1rem;">Select Company Recruitment Pattern</h3>
        <div class="form-group">
          <label class="form-label">Company Assessment Format</label>
          <select id="config-company" class="form-control">
            <option value="TCS" ${this.selectedCompany === 'TCS' ? 'selected' : ''}>TCS NQT (Cognitive, Core CS & Advanced Programming)</option>
            <option value="Infosys" ${this.selectedCompany === 'Infosys' ? 'selected' : ''}>Infosys (InfyTQ / Springboard Logic & Core Architecture)</option>
            <option value="Wipro" ${this.selectedCompany === 'Wipro' ? 'selected' : ''}>Wipro Elite NLTH (Aptitude, Core CS & Basic Coding)</option>
            <option value="Accenture" ${this.selectedCompany === 'Accenture' ? 'selected' : ''}>Accenture (Cognitive, Technical Assessment & Pseudo-code)</option>
          </select>
        </div>
        <p style="font-size: 0.75rem; color: var(--text-muted);">
          Note: These practice tests are patterned on publicly known round structures and standard difficulty levels.
        </p>
      `;
    }

    if (this.activeMode === 'coding_debugging') {
      return `
        <h3 style="font-size: 1rem; margin-bottom: 0.5rem;">Coding &amp; Debugging Assessment</h3>
        <p style="font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 1rem;">
          Focuses on code-output prediction, off-by-one errors, recursion traces, pointer bugs, and memory handling across C, C++, Java, and Python.
        </p>
        <div style="background: var(--bg-main); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border); font-size: 0.8125rem;">
          Targeted set of <strong>12 code prediction and bug identification problems</strong>.
        </div>
      `;
    }

    if (this.activeMode === 'weak_area') {
      return `
        <h3 style="font-size: 1rem; margin-bottom: 0.5rem;">Weak Area Targeted Practice</h3>
        <p style="font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 1rem;">
          SkillSync scans your previous assessment submissions, isolates topics where your accuracy is below 65%, and compiles targeted drill questions to help you strengthen specific gaps.
        </p>
        <div style="background: var(--bg-main); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border); font-size: 0.8125rem;">
          Test compiles up to <strong>10 targeted questions</strong> based on your performance history.
        </div>
      `;
    }

    return '';
  }

  bindSetupEvents() {
    // Mode tab buttons
    document.querySelectorAll('.mode-tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.activeMode = btn.getAttribute('data-mode');
        this.render();
      });
    });

    // Form inputs
    const subjectSelect = document.getElementById('config-subject');
    if (subjectSelect) {
      subjectSelect.addEventListener('change', (e) => {
        this.selectedSubject = e.target.value;
        this.selectedTopic = 'all';
        this.render();
      });
    }

    const topicSelect = document.getElementById('config-topic');
    if (topicSelect) {
      topicSelect.addEventListener('change', (e) => {
        this.selectedTopic = e.target.value;
      });
    }

    const diffSelect = document.getElementById('config-difficulty');
    if (diffSelect) {
      diffSelect.addEventListener('change', (e) => {
        this.selectedDifficulty = e.target.value;
      });
    }

    const countSelect = document.getElementById('config-count');
    if (countSelect) {
      countSelect.addEventListener('change', (e) => {
        this.questionCount = parseInt(e.target.value, 10);
      });
    }

    const companySelect = document.getElementById('config-company');
    if (companySelect) {
      companySelect.addEventListener('change', (e) => {
        this.selectedCompany = e.target.value;
      });
    }

    // Start Test Button
    const startBtn = document.getElementById('start-test-btn');
    if (startBtn) {
      startBtn.addEventListener('click', () => this.startTest());
    }
  }

  async startTest(overrideParams) {
    if (overrideParams) {
      if (overrideParams.mode) this.activeMode = overrideParams.mode;
      if (overrideParams.subject) this.selectedSubject = overrideParams.subject;
      if (overrideParams.topic) this.selectedTopic = overrideParams.topic;
      if (overrideParams.company) this.selectedCompany = overrideParams.company;
    }
    
     // Show loading while checking access
    const container = document.getElementById('assessment-view-container');

    if (container) {
      container.innerHTML = `
        <div style="text-align: center; padding: 4rem;">
          <div style="font-weight: 700;">Verifying your assessment access...</div>
        </div>
      `;
    }
    
        // Check free/Premium assessment access
    try {
      const access = await apiGetAssessmentAccess();

      if (!access.allowed) {
        showToast(access.message || 'Upgrade to Premium to continue.', 'error');
        this.status = 'setup';
        this.render();
        return;
      }
    } catch (err) {
      showToast('Unable to verify assessment access. Please try again.', 'error');
      this.status = 'setup';
      this.render();
      return;
    }

    if (container) {
      container.innerHTML = `<div style="text-align: center; padding: 4rem;"><div style="font-size: 1.125rem; font-weight: 700;">Loading questions from placement bank...</div></div>`;
    }

    try {
      let qList = [];
      let timeLimitSecs = 600;

      if (this.activeMode === 'topic_practice') {
        const res = await apiGetQuestions({
          subject: this.selectedSubject,
          topic: this.selectedTopic === 'all' ? undefined : this.selectedTopic,
          difficulty: this.selectedDifficulty === 'all' ? undefined : this.selectedDifficulty,
          limit: this.questionCount,
        });
        qList = res.questions || [];
        timeLimitSecs = this.questionCount * 75;
      } else if (this.activeMode === 'mock_test') {
        const res = await apiGetQuestions({ limit: 20 });
        qList = res.questions || [];
        timeLimitSecs = 25 * 60;
      } else if (this.activeMode === 'company_pattern') {
        const res = await apiGetQuestions({ company: this.selectedCompany, limit: 15 });
        qList = res.questions || [];
        if (qList.length < 10) {
          const fill = await apiGetQuestions({ limit: 15 - qList.length });
          qList = [...qList, ...(fill.questions || [])];
        }
        timeLimitSecs = 20 * 60;
      } else if (this.activeMode === 'coding_debugging') {
        const res = await apiGetQuestions({ mode: 'coding_debugging', limit: 12 });
        qList = res.questions || [];
        timeLimitSecs = 18 * 60;
      } else if (this.activeMode === 'weak_area') {
        const res = await apiGetWeakAreaQuestions(10);
        qList = res.questions || [];
        timeLimitSecs = 15 * 60;
      }

      if (!qList || qList.length === 0) {
        showToast('No questions available for this criteria. Loading general practice.', 'error');
        const fallback = await apiGetQuestions({ limit: 10 });
        qList = fallback.questions || [];
      }

      this.questions = qList;
      this.currentIndex = 0;
      this.answers = {};
      this.markedForReview = new Set();
      this.timeSpent = {};
      this.timeRemaining = timeLimitSecs;
      this.totalTimeSeconds = 0;
      this.status = 'testing';

      this.startTimer();
      this.render();
    } catch (err) {
      showToast('Error loading assessment questions: ' + err.message, 'error');
      this.status = 'setup';
      this.render();
    }
  }

  startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);

    this.timerInterval = setInterval(() => {
      this.totalTimeSeconds++;
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
        this.updateTimerDisplay();

        if (this.timeRemaining <= 0) {
          clearInterval(this.timerInterval);
          showToast('Time expired! Automatically submitting assessment...', 'info');
          this.submitTest();
        }
      }
    }, 1000);
  }

  formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  updateTimerDisplay() {
    const el = document.getElementById('test-timer');
    if (el) {
      el.textContent = this.formatTime(this.timeRemaining);
    }
  }

  renderTestingHTML() {
    const q = this.questions[this.currentIndex];
    if (!q) return '';

    const selectedOption = this.answers[q.id];
    const isMarked = this.markedForReview.has(q.id);

    return `
      <div class="assessment-layout">
        <!-- Main Question Area -->
        <div>
          <!-- Header Bar -->
          <div style="background: #ffffff; border: 1px solid var(--border); border-radius: var(--radius-md); padding: 1rem 1.25rem; margin-bottom: 1rem; display: flex; align-items: center; justify-content: space-between;">
            <div>
              <span style="font-size: 0.8125rem; font-weight: 700; color: var(--primary);">${this.activeMode.replace('_', ' ').toUpperCase()}</span>
              <span style="color: var(--border); margin: 0 0.5rem;">|</span>
              <span style="font-size: 0.8125rem; color: var(--text-sub);">Question ${this.currentIndex + 1} of ${this.questions.length}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem; font-family: var(--font-mono); font-size: 0.9375rem; font-weight: 700; color: #dc2626; background: #fef2f2; padding: 0.25rem 0.75rem; border-radius: var(--radius-sm); border: 1px solid #fecaca;">
              <span>&#9201;</span> <span id="test-timer">${this.formatTime(this.timeRemaining)}</span>
            </div>
          </div>

          <!-- Question Card -->
          <div class="question-box">
            <div class="question-meta">
              <div>
                <span class="badge-tag badge-tier" style="margin-right: 0.5rem;">${q.subject}</span>
                <span style="font-size: 0.75rem; color: var(--text-muted);">${q.topic}</span>
              </div>
              <span class="badge-tag" style="background: var(--bg-main); border: 1px solid var(--border); color: var(--text-sub);">${q.difficulty}</span>
            </div>

            <div class="question-text">${q.question}</div>

            ${q.codeSnippet ? `<pre class="code-snippet"><code>${q.codeSnippet}</code></pre>` : ''}

            <!-- Options -->
            <div class="options-list">
              ${q.options
                .map(
                  (opt, idx) => `
                <div class="option-item ${selectedOption === idx ? 'selected' : ''}" data-opt-idx="${idx}">
                  <input type="radio" name="question-opt" class="option-radio" ${selectedOption === idx ? 'checked' : ''}>
                  <div style="font-size: 0.875rem; color: var(--text-main); font-weight: 500;">
                    <strong style="margin-right: 0.375rem;">${String.fromCharCode(65 + idx)}.</strong> ${opt}
                  </div>
                </div>
              `
                )
                .join('')}
            </div>

            <!-- Action Controls -->
            <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 1rem; border-top: 1px solid var(--border-light);">
              <div style="display: flex; gap: 0.5rem;">
                <button type="button" id="prev-btn" class="btn btn-outline" ${this.currentIndex === 0 ? 'disabled' : ''}>
                  &larr; Previous
                </button>
                <button type="button" id="next-btn" class="btn btn-outline" ${this.currentIndex === this.questions.length - 1 ? 'disabled' : ''}>
                  Next &rarr;
                </button>
              </div>

              <div style="display: flex; gap: 0.5rem;">
                <button type="button" id="mark-review-btn" class="btn btn-outline" style="${isMarked ? 'background: #fef3c7; border-color: #fde68a;' : ''}">
                  ${isMarked ? '&#10003; Marked' : 'Mark for Review'}
                </button>
                <button type="button" id="clear-btn" class="btn btn-outline" style="color: var(--text-muted);">
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side: Question Pallet & Submit -->
        <div>
          <div class="card" style="padding: 1.25rem;">
            <div style="font-size: 0.8125rem; font-weight: 700; margin-bottom: 0.75rem;">Question Pallet</div>
            
            <div class="pallet-grid" style="margin-bottom: 1.25rem;">
              ${this.questions
                .map((item, idx) => {
                  const ans = this.answers[item.id];
                  const marked = this.markedForReview.has(item.id);
                  let bgStyle = 'background: #ffffff;';
                  let borderStyle = 'border-color: var(--border);';
                  let textColor = 'color: var(--text-main);';

                  if (idx === this.currentIndex) {
                    borderStyle = 'border: 2px solid #0f172a;';
                  }

                  if (marked) {
                    bgStyle = 'background: #fef3c7;';
                    borderStyle = 'border-color: #fde68a;';
                    textColor = 'color: #92400e;';
                  } else if (ans !== undefined && ans !== null) {
                    bgStyle = 'background: #2563eb;';
                    borderStyle = 'border-color: #2563eb;';
                    textColor = 'color: #ffffff;';
                  }

                  return `
                  <button type="button" class="pallet-btn" data-pallet-idx="${idx}" style="${bgStyle} ${borderStyle} ${textColor}">
                    ${idx + 1}
                  </button>
                `;
                })
                .join('')}
            </div>

            <!-- Legend -->
            <div style="font-size: 0.6875rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 0.375rem; padding-top: 0.75rem; border-top: 1px solid var(--border-light); margin-bottom: 1.25rem;">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="width: 12px; height: 12px; background: #2563eb; border-radius: 2px;"></span> Answered
              </div>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="width: 12px; height: 12px; background: #fef3c7; border: 1px solid #fde68a; border-radius: 2px;"></span> Marked for Review
              </div>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="width: 12px; height: 12px; background: #ffffff; border: 1px solid var(--border); border-radius: 2px;"></span> Unanswered
              </div>
            </div>

            <button type="button" id="submit-assessment-btn" class="btn btn-accent btn-block" style="padding: 0.75rem;">
              Submit Assessment
            </button>
          </div>
        </div>
      </div>
    `;
  }

  bindTestingEvents() {
    const q = this.questions[this.currentIndex];

    // Option items
    document.querySelectorAll('.option-item').forEach((item) => {
      item.addEventListener('click', () => {
        const optIdx = parseInt(item.getAttribute('data-opt-idx'), 10);
        this.answers[q.id] = optIdx;
        this.render();
      });
    });

    // Navigation buttons
    const prevBtn = document.getElementById('prev-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentIndex > 0) {
          this.currentIndex--;
          this.render();
        }
      });
    }

    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentIndex < this.questions.length - 1) {
          this.currentIndex++;
          this.render();
        }
      });
    }

    // Mark review
    const markBtn = document.getElementById('mark-review-btn');
    if (markBtn) {
      markBtn.addEventListener('click', () => {
        if (this.markedForReview.has(q.id)) {
          this.markedForReview.delete(q.id);
        } else {
          this.markedForReview.add(q.id);
        }
        this.render();
      });
    }

    // Clear
    const clearBtn = document.getElementById('clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        delete this.answers[q.id];
        this.render();
      });
    }

    // Pallet jumps
    document.querySelectorAll('.pallet-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-pallet-idx'), 10);
        this.currentIndex = idx;
        this.render();
      });
    });

    // Submit button
    const submitBtn = document.getElementById('submit-assessment-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        const answeredCount = Object.keys(this.answers).length;
        const total = this.questions.length;
        const confirmMsg = `Are you sure you want to submit? You have answered ${answeredCount} of ${total} questions.`;
        if (confirm(confirmMsg)) {
          this.submitTest();
        }
      });
    }
  }

  async submitTest() {
    if (this.timerInterval) clearInterval(this.timerInterval);

    const container = document.getElementById('assessment-view-container');
    if (container) {
      container.innerHTML = `
        <div style="text-align: center; padding: 4rem;">
          <div style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">Analyzing and scoring assessment...</div>
          <p style="font-size: 0.875rem; color: var(--text-muted);">Calculating topic breakdown, accuracy, and strong vs. weak areas.</p>
        </div>
      `;
    }

    const answersPayload = this.questions.map((q) => ({
      questionId: q.id,
      selectedOption: this.answers[q.id] !== undefined ? this.answers[q.id] : null,
      timeSpentSeconds: this.timeSpent[q.id] || 15,
    }));

    try {
      const result = await apiSubmitAssessment({
        mode: this.activeMode,
        modeTitle: this.activeMode.replace('_', ' ').toUpperCase(),
        subject: this.selectedSubject,
        topic: this.selectedTopic,
        company: this.selectedCompany,
        difficulty: this.selectedDifficulty,
        timeSpentSeconds: this.totalTimeSeconds,
        answers: answersPayload,
        questions: this.questions,
      });

      this.status = 'finished';
      if (this.onComplete && result.attempt) {
        this.onComplete(result.attempt);
      }
    } catch (err) {
      showToast('Error saving assessment: ' + err.message, 'error');
      this.status = 'setup';
      this.render();
    }
  }
}
