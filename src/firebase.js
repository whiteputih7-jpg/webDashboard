import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA52h_CU3yCWRaDDuh79kj6PLjPdnpVdgo",
  authDomain: "webdashboard-d7cf7.firebaseapp.com",
  projectId: "webdashboard-d7cf7",
  storageBucket: "webdashboard-d7cf7.firebasestorage.app",
  messagingSenderId: "534861017152",
  appId: "1:534861017152:web:4ed5ac2d7f781d0849efa5",
  measurementId: "G-X04DHM42P5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
