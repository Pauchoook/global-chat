import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'firebase/firestore';
import 'firebase/auth'
import { initializeApp } from "firebase/app"
import { createContext } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp({
  apiKey: "AIzaSyDyhaCm3U8T5N1zsnUGwEPCgTZd9AvI3fI",
  authDomain: "chat-react-e83f1.firebaseapp.com",
  projectId: "chat-react-e83f1",
  storageBucket: "chat-react-e83f1.appspot.com",
  messagingSenderId: "1044353776808",
  appId: "1:1044353776808:web:c582b62f479d1a17e6969d",
  measurementId: "G-BQQ06T7932"
});

export const Context = createContext(null);

const auth = getAuth(app);
const db = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    auth,
    db
  }}>
    <App />
  </Context.Provider>
);