
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDUVA0Sn272Nf450euXWpUhNcGEzjS-7yQ",
  authDomain: 'cvvalpha.firebaseapp.com',
  projectId: 'cvvalpha',
  storageBucket: 'cvvalpha.appspot.com',
  messagingSenderId: '1090382810592',
  appId: '1:1090382810592:web:963e5970c702f87833af85',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
