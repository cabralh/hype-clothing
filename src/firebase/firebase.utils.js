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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return; // if there is no user authenicated, we return back.

    const userRef = firestore.doc(`users/${userAuth.uid}`); // grabs reference to user authentication at that uid

    const snapShot = await userRef.get(); // creates snapshot of user reference

    // checks to see if user exists
    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        // if user does not exist then create that user using displayName, email, date created and other data. Otherwise, return error message.
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
