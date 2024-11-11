import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
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

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);