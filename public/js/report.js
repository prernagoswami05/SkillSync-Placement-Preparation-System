// Performance Diagnostic Report Generator
export class PerformanceReportView {
  constructor(attempt, onPracticeTopic) {
    this.attempt = attempt;
    this.onPracticeTopic = onPracticeTopic;
  }

  render(containerId = 'report-view-container') {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!this.attempt) {
      container.innerHTML = `
        <div class="card" style="text-align: center; padding: 4rem;">
          <h3 style="font-size: 1.125rem; margin-bottom: 0.5rem;">No Assessment Selected</h3>
          <p style="font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 1.25rem;">Complete a placement test or choose a past attempt from Attempt History.</p>
        </div>
      `;
      return;
    }

    const a = this.attempt;
    const isPlacementReady = a.scorePercentage >= 75;
    const isModerate = a.scorePercentage >= 45 && a.scorePercentage < 75;

    let tierLabel = 'Placement Ready';
    let tierColor = '#065f46';
    let tierBg = '#ecfdf5';
    let tierBorder = '#a7f3d0';

    if (isModerate) {
      tierLabel = 'Moderate Preparation';
      tierColor = '#92400e';
      tierBg = '#fffbeb';
      tierBorder = '#fde68a';
    } else if (!isPlacementReady) {
      tierLabel = 'Needs Improvement';
      tierColor = '#991b1b';
      tierBg = '#fef2f2';
      tierBorder = '#fecaca';
    }

    const mins = Math.floor((a.timeSpentSeconds || 0) / 60);
    const secs = (a.timeSpentSeconds || 0) % 60;
    const timeFormatted = `${mins}m ${secs}s`;

    container.innerHTML = `
      <div>
        <!-- Executive Header Banner -->
        <div class="card" style="padding: 1.5rem; background: linear-gradient(to right, #ffffff, #f8fafc); border-left: 4px solid var(--accent); margin-bottom: 1.5rem;">
          <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                <span class="badge-tag" style="background: ${tierBg}; color: ${tierColor}; border: 1px solid ${tierBorder};">
                  ${tierLabel}
                </span>
                <span style="font-size: 0.75rem; color: var(--text-muted);">${new Date(a.date).toLocaleDateString()} at ${new Date(a.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <h2 style="font-size: 1.25rem; font-weight: 800;">Diagnostic Placement Assessment Report</h2>
              <p style="font-size: 0.8125rem; color: var(--text-sub);">
                Candidate: <strong>${a.userName}</strong> &bull; Assessment: <strong>${a.modeTitle || a.mode}</strong> (${a.subject || 'Mixed'})
              </p>
            </div>

            <div style="text-align: right;">
              <div style="font-size: 2.25rem; font-weight: 800; color: var(--primary); line-height: 1;">${a.scorePercentage}%</div>
              <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-top: 0.25rem;">Overall Score</div>
            </div>
          </div>
        </div>

        <!-- 4-Metric Grid -->
        <div class="grid-cols-4" style="margin-bottom: 1.5rem;">
          <div class="stat-card">
            <div>
              <div class="stat-value">${a.totalQuestions}</div>
              <div class="stat-label">Total Questions</div>
            </div>
          </div>

          <div class="stat-card">
            <div>
              <div class="stat-value" style="color: #059669;">${a.correctCount}</div>
              <div class="stat-label">Correct Answers</div>
            </div>
          </div>

          <div class="stat-card">
            <div>
              <div class="stat-value" style="color: #dc2626;">${a.incorrectCount}</div>
              <div class="stat-label">Incorrect Answers</div>
            </div>
          </div>

          <div class="stat-card">
            <div>
              <div class="stat-value" style="color: var(--accent);">${timeFormatted}</div>
              <div class="stat-label">Time Elapsed</div>
            </div>
          </div>
        </div>

        <!-- Topic Breakdown & Strong/Weak Areas -->
        <div class="grid-cols-2" style="margin-bottom: 1.5rem;">
          <!-- Strong Topics -->
          <div class="card" style="padding: 1.25rem;">
            <div style="font-size: 0.875rem; font-weight: 700; color: #065f46; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
              <span>&#10004;</span> Strong Topics (&ge; 65% Accuracy)
            </div>
            ${
              a.strongTopics && a.strongTopics.length > 0
                ? `<div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    ${a.strongTopics
                      .map(
                        (t) =>
                          `<span style="background: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46; padding: 0.25rem 0.625rem; border-radius: var(--radius-sm); font-size: 0.75rem; font-weight: 600;">${t}</span>`
                      )
                      .join('')}
                   </div>`
                : `<p style="font-size: 0.8125rem; color: var(--text-muted);">No topics met the 65% threshold in this session.</p>`
            }
          </div>

          <!-- Weak Topics -->
          <div class="card" style="padding: 1.25rem;">
            <div style="font-size: 0.875rem; font-weight: 700; color: #991b1b; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
              <span>&#9888;</span> Weak Topics (&lt; 65% Accuracy)
            </div>
            ${
              a.weakTopics && a.weakTopics.length > 0
                ? `<div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    ${a.weakTopics
                      .map(
                        (t) => `
                        <div style="display: flex; align-items: center; justify-content: space-between; background: #fef2f2; border: 1px solid #fecaca; padding: 0.375rem 0.625rem; border-radius: var(--radius-sm);">
                          <span style="font-size: 0.75rem; font-weight: 600; color: #991b1b;">${t}</span>
                          <button type="button" class="btn btn-outline btn-sm practice-topic-btn" data-topic="${t}" style="padding: 0.2rem 0.5rem; font-size: 0.6875rem; background: #ffffff;">
                            Practice This &rarr;
                          </button>
                        </div>
                      `
                      )
                      .join('')}
                   </div>`
                : `<p style="font-size: 0.8125rem; color: #059669; font-weight: 600;">Great performance! No weak areas identified in this test.</p>`
            }
          </div>
        </div>

        <!-- Question-by-Question Review -->
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title">Question-by-Question Diagnostic Review</div>
              <div class="card-subtitle">Examine your answers, correct solutions, and conceptual explanations</div>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${(a.questionsSnapshot || [])
              .map((q, qIdx) => {
                const userAns = (a.answers || []).find((ans) => ans.questionId === q.id);
                const selectedOpt = userAns ? userAns.selectedOption : null;
                const isCorrect = userAns ? userAns.isCorrect : false;
                const isSkipped = selectedOpt === null || selectedOpt === undefined;

                return `
                <div style="border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 1rem; background: #ffffff;">
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                      <span style="font-size: 0.8125rem; font-weight: 700; color: var(--text-main);">Q${qIdx + 1}.</span>
                      <span class="badge-tag badge-tier">${q.subject}</span>
                      <span style="font-size: 0.75rem; color: var(--text-muted);">${q.topic}</span>
                    </div>
                    <div>
                      ${
                        isSkipped
                          ? `<span class="badge-tag" style="background: var(--bg-main); color: var(--text-muted); border: 1px solid var(--border);">Skipped</span>`
                          : isCorrect
                          ? `<span class="badge-tag" style="background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0;">&#10004; Correct</span>`
                          : `<span class="badge-tag" style="background: #fef2f2; color: #991b1b; border: 1px solid #fecaca;">&#10008; Incorrect</span>`
                      }
                    </div>
                  </div>

                  <div style="font-size: 0.9375rem; font-weight: 600; color: var(--text-main); margin-bottom: 0.75rem;">
                    ${q.question}
                  </div>

                  ${q.codeSnippet ? `<pre class="code-snippet"><code>${q.codeSnippet}</code></pre>` : ''}

                  <!-- 4 Options -->
                  <div style="display: grid; grid-template-columns: 1fr; gap: 0.375rem; margin-bottom: 0.75rem;">
                    ${q.options
                      .map((opt, optIdx) => {
                        const isThisCorrect = optIdx === q.correctAnswer;
                        const isThisUserSelected = optIdx === selectedOpt;

                        let rowStyle = 'background: #ffffff; border-color: var(--border);';
                        let prefix = '';

                        if (isThisCorrect) {
                          rowStyle = 'background: #ecfdf5; border-color: #a7f3d0; color: #065f46; font-weight: 600;';
                          prefix = '&#10004; Correct: ';
                        } else if (isThisUserSelected && !isCorrect) {
                          rowStyle = 'background: #fef2f2; border-color: #fecaca; color: #991b1b; font-weight: 600;';
                          prefix = '&#10008; Your Answer: ';
                        }

                        return `
                        <div style="padding: 0.5rem 0.75rem; border: 1px solid transparent; border-radius: var(--radius-sm); font-size: 0.8125rem; ${rowStyle}">
                          <strong>${String.fromCharCode(65 + optIdx)}.</strong> ${prefix}${opt}
                        </div>
                      `;
                      })
                      .join('')}
                  </div>

                  <!-- Explanation Box -->
                  <div style="background: var(--bg-main); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-light); font-size: 0.8125rem; color: var(--text-sub);">
                    <strong style="color: var(--text-main);">Explanation:</strong> ${q.explanation}
                  </div>
                </div>
              `;
              })
              .join('')}
          </div>
        </div>
      </div>
    `;

    // Bind practice buttons
    container.querySelectorAll('.practice-topic-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const topic = btn.getAttribute('data-topic');
        if (this.onPracticeTopic) {
          this.onPracticeTopic(topic);
        }
      });
    });
  }
}
