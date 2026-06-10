import React, { useState, useEffect, useCallback } from 'react';
import { ALL_CHAPTERS, FORTISASE_CHAPTERS, SDWAN_CHAPTERS, EXAM_DATE } from './data/chapters.js';
import { useSync } from './hooks/useSync.js';
import ChapterCard from './components/ChapterCard.jsx';
import StatsRow from './components/StatsRow.jsx';
import ExamCard from './components/ExamCard.jsx';

const STORAGE_KEY = 'nse5-tracker-v1';

// Resolve session ID from URL param (?s=...) or localStorage, creating one if needed
function getSessionId() {
  const param = new URLSearchParams(window.location.search).get('s');
  if (param) {
    localStorage.setItem('nse5-session-id', param);
    const url = new URL(window.location.href);
    url.searchParams.delete('s');
    window.history.replaceState({}, '', url);
    return param;
  }
  let id = localStorage.getItem('nse5-session-id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('nse5-session-id', id);
  }
  return id;
}

const SESSION_ID = getSessionId();

function initState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return Object.fromEntries(
    ALL_CHAPTERS.map(ch => [ch.id, { checks: [false, false, false, false], confidence: 0 }])
  );
}

const SYNC_LABELS = {
  loading: 'Syncing…',
  synced:  'Synced',
  saving:  'Saving…',
  offline: 'Offline',
  local:   'Local only',
};

export default function App() {
  const [chapters, setChapters] = useState(initState);

  // Always mirror to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chapters));
  }, [chapters]);

  const syncStatus = useSync(SESSION_ID, chapters, setChapters);

  const [copied, setCopied] = useState(false);

  function copyLink() {
    const url = new URL(window.location.href);
    url.searchParams.set('s', SESSION_ID);
    navigator.clipboard.writeText(url.toString()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  const toggleCheck = useCallback((id, idx) => {
    setChapters(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        checks: prev[id].checks.map((v, i) => (i === idx ? !v : v)),
      },
    }));
  }, []);

  const setConfidence = useCallback((id, val) => {
    setChapters(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        confidence: prev[id].confidence === val ? 0 : val,
      },
    }));
  }, []);

  return (
    <div className="app">
      <header className="page-header">
        <div className="name-tag">
          <span className="name-tag-dot" />
          NSE5 · FortiSASE &amp; SD-WAN 7.6
        </div>
        <h1>Study <em>Tracker</em></h1>
        <p className="subtitle">Core Administrator — NSE5_SSE_AD-7.6</p>

        <div className="sync-bar">
          <span className={`sync-dot sync-dot-${syncStatus}`} />
          <span className="sync-label">{SYNC_LABELS[syncStatus] ?? syncStatus}</span>
          {syncStatus !== 'loading' && (
            <button className="copy-link-btn" onClick={copyLink}>
              {copied ? '✓ Link copied' : 'Copy sync link'}
            </button>
          )}
        </div>
      </header>

      <StatsRow chapters={chapters} allChapters={ALL_CHAPTERS} examDate={EXAM_DATE} />

      {/* SD-WAN first */}
      <section className="track-section">
        <div className="section-header">
          <div className="section-title">
            <span className="section-label">SD-WAN</span>
            <span className="section-version">7.6</span>
          </div>
          <span className="section-count">7 chapters</span>
        </div>
        <div className="card-grid">
          {SDWAN_CHAPTERS.map(ch => (
            <ChapterCard
              key={ch.id}
              chapter={ch}
              state={chapters[ch.id]}
              onToggle={toggleCheck}
              onConfidence={setConfidence}
            />
          ))}
        </div>
      </section>

      {/* FortiSASE second */}
      <section className="track-section">
        <div className="section-header">
          <div className="section-title">
            <span className="section-label">FortiSASE</span>
            <span className="section-version">25</span>
          </div>
          <span className="section-count">5 chapters</span>
        </div>
        <div className="card-grid">
          {FORTISASE_CHAPTERS.map(ch => (
            <ChapterCard
              key={ch.id}
              chapter={ch}
              state={chapters[ch.id]}
              onToggle={toggleCheck}
              onConfidence={setConfidence}
            />
          ))}
        </div>
      </section>

      <ExamCard examDate={EXAM_DATE} />

      <footer className="page-footer">
        <span>NSE5_SSE_AD-7.6</span>
        &nbsp;·&nbsp;
        FortiSASE 25 / FortiOS 7.6 / FortiClient 7.0
      </footer>
    </div>
  );
}
