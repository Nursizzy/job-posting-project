// @ts-ignore
import { initializeApp } from 'firebase/app';
// @ts-ignore
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC_OBgQYGnesfy4ig-x7121RlLb-k_U8RY',
  authDomain: 'job-posting-portal-81502.firebaseapp.com',
  projectId: 'job-posting-portal-81502',
  storageBucket: 'job-posting-portal-81502.appspot.com',
  messagingSenderId: '854408111188',
  appId: '1:854408111188:web:f2de8e453863283fb4f9c1',
};

const app = initializeApp(firebaseConfig);

export default getFirestore();
