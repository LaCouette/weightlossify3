import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAGLAjvWLynvDPxTlpNdfe3ozXzOw-NzD4",
  authDomain: "weightlossify-4fc28.firebaseapp.com",
  projectId: "weightlossify-4fc28",
  storageBucket: "weightlossify-4fc28.appspot.com",
  messagingSenderId: "301125435144",
  appId: "1:301125435144:web:5a7abdca60c75c9031f6bd",
  measurementId: "G-FKN8WWMXKK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Only initialize analytics in production and in browser environment
let analytics = null;
if (typeof window !== 'undefined' && import.meta.env.PROD) {
  analytics = getAnalytics(app);
}

export { analytics };