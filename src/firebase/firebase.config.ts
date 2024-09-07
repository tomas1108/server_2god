// firebase.config.ts
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Lấy cấu hình từ biến môi trường
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'checkinface-56754.firebaseapp.com',
  databaseURL: 'https://checkinface-56754-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'checkinface-56754',
  storageBucket: 'checkinface-56754.appspot.com',
  messagingSenderId: '256891935466',
  appId: '1:256891935466:web:7e4f2259823fac73c21593',
  measurementId: 'G-D93P55XH7D',
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
