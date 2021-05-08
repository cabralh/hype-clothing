import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyAx01MiFaO30hXZB83oIX31dVZ9TfbDZE0",
    authDomain: "hype-db-9e6af.firebaseapp.com",
    projectId: "hype-db-9e6af",
    storageBucket: "hype-db-9e6af.appspot.com",
    messagingSenderId: "13698887405",
    appId: "1:13698887405:web:af6bc0eb962ca787a3a6e4",
    measurementId: "G-QC6JM5MNQJ"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
