import React, { useContext, useEffect, useState } from "react";
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
} from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  where,
  query,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const [scoreState, setScoreState] = useState(0);

  //----------------------auth functions--------------------------------

  /* 

SIGNUP

*/

  const signup = async (email, password, username) => {
    try {
      //first, we see if the username is already registered
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      let isUsernameUnique = true;

      //if the username exists in the db, we return an obj with the status 'false'
      querySnapshot.forEach((doc) => {
        if (doc.data() !== null) isUsernameUnique = false;
      });
      if (!isUsernameUnique)
        return {
          status: false,
          reason: "Username already exists. Please log in.",
        };

      //if email already exists, this will return an array with login methods
      const checkIfEmailExists = await fetchSignInMethodsForEmail(auth, email);
      //if there is a login method listed, we know the user already exists
      if (checkIfEmailExists.length > 0) {
        // if user exists, stop signup and an obj with the status 'false'
        return {
          status: false,
          reason: "User email already exists. Please log in.",
        };
      } else {
        //if the email is unique to our db, proceed with signup
        await createUserWithEmailAndPassword(auth, email, password);
        await onAuthStateChanged(auth, async (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User

            //create a user in our users table
            setDoc(doc(db, "users/", user.uid), {
              email: email,
              username: username,
              uid: user.uid,
              userCreatedAt: Timestamp.fromDate(new Date()),
            });

            //add username as displayName to auth user
            await updateProfile(user, { displayName: username });

            // ...
          } else {
            // User is signed out
            // ...
          }
        });
        //The signup page needs a 'true' status to continue the signup
        return { status: true, reason: "success" };
      }
    } catch (error) {
      console.log("signup error: ", error);
    }
  };

  /* 

GUEST => REGISTERED USER

*/

  //if a guest wants to save their scores, then can convert
  //to a registered user
  const registerGuest = async (email, password, username) => {
    try {
      //first, we see if the username is already registered
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
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
          reason: "Username already exists. Please log in.",
        };

      //if email already exists, this will return an array with login methods
      const checkIfEmailExists = await fetchSignInMethodsForEmail(auth, email);
      //if there is a login method listed, we know the user already exists
      if (checkIfEmailExists.length > 0) {
        // if user exists, stop signup and an obj with the status 'false'
        return {
          status: false,
          reason: "User email already exists. Please log in.",
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
            console.log("Anonymous account successfully upgraded", user);
          })
          .catch((error) => {
            console.log("Error upgrading anonymous account", error);
          });

        //once that's done, we'll create the user document
        await onAuthStateChanged(auth, async (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User

            //create a user in our users table
            setDoc(doc(db, "users/", user.uid), {
              email: email,
              username: username,
              uid: user.uid,
              userCreatedAt: Timestamp.fromDate(new Date()),
            });

            //add username as displayName to auth user, replacing 'guest'
            await updateProfile(user, { displayName: username });

            //update the username in the user's score entries
            async function updateScores() {
              const scoreQ = query(
                collection(db, "scores"),
                where("uid", "==", user.uid)
              );
              const scoresSnapshot = await getDocs(scoreQ);
              scoresSnapshot.forEach(async (document) => {
                console.log("doccies! ", document.id);
                const docRef = doc(db, "scores", document.id);
                console.log("DN: ", user.displayName);
                await updateDoc(docRef, { username: username });
              });
            }
            updateScores();

            // ...
          } else {
            // User is signed out
            // ...
          }
        });
        //The registration page needs a 'true' status to continue
        return { status: true, reason: "success" };
      }
    } catch (error) {
      console.log("signup error: ", error);
    }
  };

  /* 

LOG IN

*/

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  /* 

LOGIN AS GUEST

*/

  const loginAsGuest = async () => {
    try {
      // console.log('trying guest login');
      await signInAnonymously(auth);
      await onAuthStateChanged(auth, async (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          updateProfile(user, { displayName: "guest" });
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

  /* 

LOG OUT

*/

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
