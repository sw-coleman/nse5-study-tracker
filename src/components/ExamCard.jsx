import React, { useState, useEffect } from 'react';

function computeDays(examDate) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const exam = new Date(examDate);
  exam.setHours(0, 0, 0, 0);
  return Math.ceil((exam - now) / (1000 * 60 * 60 * 24));
}

const META = [
  { label: 'Exam Code',  value: 'NSE5_SSE_AD-7.6' },
  { label: 'Duration',   value: '65 minutes' },
  { label: 'Questions',  value: '30–35' },
  { label: 'Products',   value: 'FortiSASE 25 · FortiOS 7.6 · FortiClient 7.0 · FortiAuthenticator 6.5 · FortiManager 7.6' },
  { label: 'Exam Date',  value: '7 July 2026' },
];

export default function ExamCard({ examDate }) {
  const [days, setDays] = useState(() => computeDays(examDate));

  useEffect(() => {
    const id = setInterval(() => setDays(computeDays(examDate)), 60_000);
    return () => clearInterval(id);
  }, [examDate]);

  let countValue, countSub;
  if (days > 1)      { countValue = days;  countSub = 'days to go'; }
  else if (days === 1) { countValue = 1;   countSub = 'day to go'; }
  else if (days === 0) { countValue = '!'; countSub = 'Exam day'; }
  else                 { countValue = '✓'; countSub = 'Completed'; }

  return (
    <div className="exam-card">
      <div className="exam-icon">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      </div>

      <div className="exam-body">
        <div className="exam-cert-code">NSE5_SSE_AD-7.6</div>
        <div className="exam-cert-name">Fortinet NSE 5 — FortiSASE &amp; SD-WAN Core Administrator</div>

        <div className="exam-divider" />

        <div className="exam-meta-grid">
          {META.map(m => (
            <div key={m.label} className="exam-meta-row">
              <span className="exam-meta-label">{m.label}</span>
              <span className="exam-meta-value">{m.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="exam-countdown">
        <div className={`exam-count-value${days <= 7 && days >= 0 ? ' urgent' : ''}`}>
          {countValue}
        </div>
        <div className="exam-count-sub">{countSub}</div>
        <div className="status-badge badge-in-progress exam-badge">
          <span className="status-dot sdot-in-progress" />
          Scheduled
        </div>
      </div>
    </div>
  );
}
