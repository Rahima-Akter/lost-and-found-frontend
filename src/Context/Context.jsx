import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config"


export const authContext = createContext()

const Context = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const handleRegister = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoading(false)
        signOut(auth)
    }

    const manageProfile = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: image
        }).then(() => {
            const updatedProfile = auth.currentUser;
            setUser(updatedProfile)
        })
    }

    // google Login
    const googleProvider = new GoogleAuthProvider();
    const handleGoogleLogin = () => {
        return signInWithPopup(auth, googleProvider)
    };

    // observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
                setLoading(false)
            } else {
                setUser(null)
            }
            setLoading(false)
        });

        return () => {
            unsubscribe()
        };

    }, [])


    const authInfo = {
        handleRegister,
        handleGoogleLogin,
        logIn,
        logOut,
        manageProfile,
        loading,
        user,
        setUser
    }

    return (

        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>

    );
};

export default Context;