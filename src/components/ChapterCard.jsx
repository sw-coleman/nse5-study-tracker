import React from 'react';
import { CHECKBOXES, CONF_COLORS, CONF_SHADOWS, WEEK_RANGES } from '../data/chapters.js';

function getStatus(checks) {
  const n = checks.filter(Boolean).length;
  if (n === 0) return 'pending';
  if (n === 4) return 'complete';
  return 'in-progress';
}

const STATUS_LABELS = {
  pending: 'Pending',
  'in-progress': 'In Progress',
  complete: 'Complete',
};

export default function ChapterCard({ chapter, state, onToggle, onConfidence }) {
  const { id, num, title, week, appendix } = chapter;
  const { checks, confidence } = state;
  const status = getStatus(checks);

  return (
    <div className={`chapter-card status-${status}`}>
      <div className="card-top">
        <span className="week-tag">Wk {week} · {WEEK_RANGES[week]}</span>
        <div className={`status-badge badge-${status}`}>
          <span className={`status-dot sdot-${status}`} />
          {STATUS_LABELS[status]}
        </div>
      </div>

      <div className="card-chapter-num">Ch {num}{appendix ? ' · Appendix' : ''}</div>
      <div className="card-chapter-title">{title}</div>

      <div className="card-divider" />

      <div className="checks-list">
        {CHECKBOXES.map((label, i) => (
          <label key={i} className="check-item">
            <input
              type="checkbox"
              checked={checks[i]}
              onChange={() => onToggle(id, i)}
            />
            <span className="check-box">
              {checks[i] && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path
                    d="M1 3.5L3.8 6.5L9 1"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <span className="check-label">{label}</span>
          </label>
        ))}
      </div>

      <div className="confidence-row">
        <span className="confidence-label">Confidence</span>
        <div className="conf-dots">
          {[1, 2, 3, 4, 5].map(i => (
            <button
              key={i}
              className={`conf-dot${confidence >= i ? ' filled' : ''}`}
              style={
                confidence >= i
                  ? {
                      background: CONF_COLORS[i],
                      borderColor: CONF_COLORS[i],
                      boxShadow: `0 0 8px ${CONF_SHADOWS[i]}`,
                    }
                  : {}
              }
              onClick={() => onConfidence(id, i)}
              title={`Confidence ${i}/5`}
              aria-label={`Set confidence ${i} of 5`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
