import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../config/firebase-config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import Preloader from "../components/Preloader";

const userDocRef = collection(firestore, "user");

const Context = createContext();
export function AuthContextProvider({ children }) {
  // const [user] = useAuthState(auth);
  const [user, setUser] = useState();
  const [userLoading, setUserLoading] = useState(true);
  const [userToken, setUserToken] = useState({});

  async function registerUser(value) {
    const displayName = value.displayName.split(" ");
    displayName.forEach((element, index) => {
      displayName[index] = element.charAt(0).toUpperCase() + element.slice(1);
    });

    setUserLoading(true);

    await createUserWithEmailAndPassword(
      auth,
      value.email,
      value.password,
    ).then(async (result) => {
      await updateProfile(result.user, {
        displayName: displayName.join(" ").trimEnd(),
      });

      await setDoc(doc(userDocRef, result.user.uid), {
        userId: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        createdAt: result.user.metadata.createdAt,
      });

      setUserLoading(false);
    });
  }

  async function loginUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password).then(() => {
      setUserLoading(false);
    });
  }

  function logoutUser() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setUserLoading(false);
      if (currentUser) {
        // Fetch the user's profile data
        currentUser
          .getIdTokenResult()
          .then((idTokenResult) => {
            const profileData = idTokenResult;
            setUserToken(profileData);
          })
          .catch((error) => {
            console.error("Error fetching user profile:", error);
          });
      } else {
        setUserToken(null);
      }
    });
    return unsubscribe;
  }, [user]);

  const value = {
    user,
    registerUser,
    loginUser,
    logoutUser,
    userLoading,
    userToken,
  };
  return (
    <Context.Provider value={value}>
      {userLoading ? <Preloader /> : children}
    </Context.Provider>
  );
}

export function useAuth() {
  return useContext(Context);
}
