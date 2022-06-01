import process from 'process';
import {initializeApp} from 'firebase/app';
import {getAnalytics, isSupported} from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyBHPl9K-QpZLUa6NqnxQax_cfQtkdIH2Rc',
  authDomain: 'web-launcher-db.firebaseapp.com',
  projectId: 'web-launcher-db',
  storageBucket: 'web-launcher-db.appspot.com',
  messagingSenderId: '698125219814',
  appId: '1:698125219814:web:83a78a71bc48821aaa0827',
  measurementId: 'G-0LPGHL8YMY',
};

const app = initializeApp(firebaseConfig);

async function initAnalytics() {
  if (process.env.NODE_ENV === 'production' && (await isSupported())) {
    getAnalytics(app);
  }
}

initAnalytics();
