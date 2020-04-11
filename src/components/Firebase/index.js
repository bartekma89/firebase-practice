import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import * as firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
    this.persistance = app.auth.Auth.Persistence;
  }

  // Auth API
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  setPersistance = (sessionStatus) =>
    firebase.auth().setPersistence(sessionStatus);

  // Cars API
  car = (uid) => this.db.ref(`cars/${uid}`);
  cars = () => this.db.ref('cars');
}

export default Firebase;
