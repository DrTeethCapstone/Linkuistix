import React, { useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  onAuthStateChanged,
  signOut,
  signInAnonymously,
  getAuth,
  updateProfile,
  EmailAuthProvider,
  linkWithCredential,
} from 'firebase/auth';
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
  where,
  query,
  Timestamp,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { getDatabase, ref, set } from 'firebase/database';

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const [scoreState, setScoreState] = useState(0);

  //auth functions
  const signup = async (email, password, username) => {
    try {
      //first, we see if the username is already registered
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);

      let isUsernameUnique = true;

      //if the username exists in the db, we return an obj with the status 'false'
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        if (doc.data() !== null) isUsernameUnique = false;
      });
      if (!isUsernameUnique)
        return {
          status: false,
          reason: 'Username already exists. Please log in.',
        };

      //if email already exists, this will return an array with login methods
      const checkIfEmailExists = await fetchSignInMethodsForEmail(auth, email);
      //if there is a login method listed, we know the user already exists
      if (checkIfEmailExists.length > 0) {
        // if user exists, stop signup and an obj with the status 'false'
        return {
          status: false,
          reason: 'User email already exists. Please log in.',
        };
      } else {
        //if the email is unique to our db, proceed with signup
        await createUserWithEmailAndPassword(auth, email, password);
        await onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User

            //create a user in our users table
            setDoc(doc(db, 'users/', user.uid), {
              email: email,
              username: username,
              uid: user.uid,
              userCreatedAt: Timestamp.fromDate(new Date()),
            });

            //add username as displayName to auth user
            updateProfile(user, { displayName: username });

            // ...
          } else {
            // User is signed out
            // ...
          }
        });
        //The signup page needs a 'true' status to continue the signup
        return { status: true, reason: 'success' };
      }
    } catch (error) {
      console.log('signup error: ', error);
    }
  };

  //if a guest wants to save their scores, then can convert
  //to a registered user
  const registerGuest = async (email, password, username) => {
    try {
      //first, we see if the username is already registered
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);

      let isUsernameUnique = true;

      //if the username exists in the db, we return an obj with the status 'false'
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        if (doc.data() !== null) isUsernameUnique = false;
      });
      if (!isUsernameUnique)
        return {
          status: false,
          reason: 'Username already exists. Please log in.',
        };

      //if email already exists, this will return an array with login methods
      const checkIfEmailExists = await fetchSignInMethodsForEmail(auth, email);
      //if there is a login method listed, we know the user already exists
      if (checkIfEmailExists.length > 0) {
        // if user exists, stop signup and an obj with the status 'false'
        return {
          status: false,
          reason: 'User email already exists. Please log in.',
        };
      } else {
        //if the email is unique to our db, proceed with signup

        //create the credentials from the form
        const credential = EmailAuthProvider.credential(email, password);

        const auth = getAuth();

        //link the guest account with the new credentials
        linkWithCredential(auth.currentUser, credential)
          .then((usercred) => {
            const user = usercred.user;
            console.log('Anonymous account successfully upgraded', user);
          })
          .catch((error) => {
            console.log('Error upgrading anonymous account', error);
          });

        //once that's done, we'll create the user document
        await onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User

            //create a user in our users table
            setDoc(doc(db, 'users/', user.uid), {
              email: email,
              username: username,
              uid: user.uid,
              userCreatedAt: Timestamp.fromDate(new Date()),
            });

            //add username as displayName to auth user, replacing 'guest'
            updateProfile(user, { displayName: username });

            // ...
          } else {
            // User is signed out
            // ...
          }
        });
        //The registration page needs a 'true' status to continue
        return { status: true, reason: 'success' };
      }
    } catch (error) {
      console.log('signup error: ', error);
    }
  };
  // const addUserToDb = async (email, username) => {
  //     const docRef = doc(db, 'users')
  //     await setDoc(docRef, {
  //         email: email,
  //         username: username
  //     })
  // }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginAsGuest = async () => {
    try {
      console.log('trying guest login');
      await signInAnonymously(auth);
      await onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          updateProfile(user, { displayName: 'guest' });
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // database functions

  // const getUserDataThunk = async () => {
  //     const q = query(collection(db, 'users'), where('email', '==', currentUser.email))
  //     const queryUsers = await getDocs(q)
  //     queryUsers.forEach((doc) => {
  //         console.log(doc.data())
  //                 setUserData(doc.data())
  //             })
  // }

  const value = {
    currentUser,

    login,
    signup,
    logout,
    registerGuest,

    setScoreState,
    scoreState,
    loginAsGuest,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// db before
// users collection - scores collection
//users - email, username
//scores - email, score

// db refactor goal
// users collection only
// users - email, username, scores
//      username: will
//      email: will@gmail.com
//      scores field - [{score, date}, {score, date}]
//          --- {score: 400, date: 4/13/22-12:23pm}
