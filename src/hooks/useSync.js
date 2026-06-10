import { useEffect, useRef, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase.js';
import { ALL_CHAPTERS } from '../data/chapters.js';

const COLL = 'sessions';

function defaults() {
  return Object.fromEntries(
    ALL_CHAPTERS.map(ch => [ch.id, { checks: [false, false, false, false], confidence: 0 }])
  );
}

export function useSync(sessionId, chapters, setChapters) {
  const [status, setStatus] = useState('loading');
  const ready = useRef(false);
  const timer = useRef(null);

  // One-time load from Firestore
  useEffect(() => {
    if (!sessionId) return;

    if (!db) {
      ready.current = true;
      setStatus('local');
      return;
    }

    setStatus('loading');
    getDoc(doc(db, COLL, sessionId))
      .then(snap => {
        if (snap.exists()) {
          const remote = snap.data().chapters;
          const merged = { ...defaults(), ...remote };
          setChapters(merged);
          localStorage.setItem('nse5-tracker-v1', JSON.stringify(merged));
        }
        ready.current = true;
        setStatus('synced');
      })
      .catch(() => {
        ready.current = true;
        setStatus('offline');
      });
  }, [sessionId]);

  // Debounced write whenever chapters change
  useEffect(() => {
    if (!ready.current || !db) return;

    setStatus('saving');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setDoc(doc(db, COLL, sessionId), { chapters, updated: Date.now() })
        .then(() => setStatus('synced'))
        .catch(() => setStatus('offline'));
    }, 1200);

    return () => clearTimeout(timer.current);
  }, [chapters, sessionId]);

  return status;
}
