import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config={
    apiKey: "AIzaSyCXRjWQPT3r1URwfhsupGjcYVVWenYaTEw",
    authDomain: "crwn-db-f5860.firebaseapp.com",
    databaseURL: "https://crwn-db-f5860.firebaseio.com",
    projectId: "crwn-db-f5860",
    storageBucket: "crwn-db-f5860.appspot.com",
    messagingSenderId: "46475244234",
    appId: "1:46475244234:web:f6c5225b2d313e7d67ba33",
    measurementId: "G-GHWFYDP1XC"
  };

  export const createUserProfileDocument= async(userAuth,additionalData) =>
  {
      if(!userAuth) return;

      const userRef=firestore.doc(`users/${userAuth.uid }`)
      const snapShot= await userRef.get();

            // console.log(snapShot);

            if(!snapShot.exists)
            {

              const {displayName,email}=userAuth;
              const createdAt=new Date();
              try{

                await userRef.set({
                  displayName,
                  email,
                  createdAt,
                  ...additionalData
                })
              } catch(error) {
                          console.log('error creating message:',error.message);
              }
            }

            return userRef;
  };

  firebase.initializeApp(config);

  export const auth=firebase.auth();
  export const firestore=firebase.firestore();

  const provider=new firebase.auth.GoogleAuthProvider();  //for google authentication
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle=() => auth.signInWithPopup(provider);  //we can also use authentication via twitter account etc.

  export default firebase;