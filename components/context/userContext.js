import { createContext, useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const auth = getAuth();
  const signUp = (email, pwd) =>
    createUserWithEmailAndPassword(auth, email, pwd);
  const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd);
  const [currentUser, setCurrentUser] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [idUserFirebase, setIdUserFirebase] = useState(null);

  const keepIdUserFirebase = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        setIdUserFirebase(uid) 
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      keepIdUserFirebase();
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setLoadingData(false);
      setIdUserFirebase(null);
    });
    return unsubscribe;
  }, [currentUser]);

  return (
    <UserContext.Provider
      value={{
        signUp,
        signIn,
        currentUser,
        setCurrentUser
        // idUserFirebase,
        // setIdUserFirebase,
         
      }}
    >
      {!loadingData && props.children}
    </UserContext.Provider>
  );
}
