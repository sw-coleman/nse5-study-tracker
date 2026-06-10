import { initializeApp } from 'firebase/app';
import { initializeFirestore, persistentLocalCache } from 'firebase/firestore';

let db = null;

const apiKey     = import.meta.env.VITE_FB_API_KEY;
const projectId  = import.meta.env.VITE_FB_PROJECT_ID;

if (apiKey && projectId) {
  try {
    const app = initializeApp({
      apiKey,
      authDomain:        import.meta.env.VITE_FB_AUTH_DOMAIN,
      projectId,
      storageBucket:     import.meta.env.VITE_FB_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
      appId:             import.meta.env.VITE_FB_APP_ID,
    });
    // persistentLocalCache gives free offline support
    db = initializeFirestore(app, { localCache: persistentLocalCache() });
  } catch (e) {
    console.warn('Firebase init failed:', e.message);
  }
}

export { db };
