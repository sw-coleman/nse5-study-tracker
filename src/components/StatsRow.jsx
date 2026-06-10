import React, { useMemo } from 'react';

function computeDays(examDate) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const exam = new Date(examDate);
  exam.setHours(0, 0, 0, 0);
  return Math.ceil((exam - now) / (1000 * 60 * 60 * 24));
}

export default function StatsRow({ chapters, allChapters, examDate }) {
  const stats = useMemo(() => {
    let done = 0, videos = 0, drilled = 0, podcasts = 0, totalBoxes = 0, checkedBoxes = 0;
    for (const ch of allChapters) {
      const s = chapters[ch.id];
      if (!s) continue;
      totalBoxes += 4;
      const n = s.checks.filter(Boolean).length;
      checkedBoxes += n;
      if (n === 4) done++;
      if (s.checks[0]) videos++;
      if (s.checks[1]) drilled++;
      if (s.checks[2]) podcasts++;
    }
    return { done, videos, drilled, podcasts, totalBoxes, checkedBoxes };
  }, [chapters, allChapters]);

  const days = computeDays(examDate);
  const pct = stats.totalBoxes > 0 ? Math.round((stats.checkedBoxes / stats.totalBoxes) * 100) : 0;
  const total = allChapters.length;

  let daysValue, daysLabel;
  if (days > 0) { daysValue = days; daysLabel = 'Days to Exam'; }
  else if (days === 0) { daysValue = '!'; daysLabel = 'Exam Day'; }
  else { daysValue = '✓'; daysLabel = 'Exam Passed'; }

  const items = [
    { value: stats.done,    sub: `/ ${total}`, label: 'Chapters Done' },
    { value: stats.videos,  sub: `/ ${total}`, label: 'Videos Watched' },
    { value: stats.drilled, sub: `/ ${total}`, label: 'Chapters Drilled' },
    { value: stats.podcasts,sub: `/ ${total}`, label: 'Podcasts Done' },
    { value: daysValue, sub: null, label: daysLabel, urgent: days >= 0 && days <= 7 },
  ];

  return (
    <div className="stats-section">
      <div className="stats-row">
        {items.map((item, i) => (
          <div key={i} className="stat-card">
            <div className={`stat-value${item.urgent ? ' urgent' : ''}`}>
              {item.value}
              {item.sub && <span className="stat-sub">{item.sub}</span>}
            </div>
            <div className="stat-label">{item.label}</div>
          </div>
        ))}
      </div>
      <div className="progress-wrap">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="progress-pct">{pct}% complete</span>
      </div>
    </div>
  );
}
