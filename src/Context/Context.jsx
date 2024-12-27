import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config"
import axios from "axios";


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

    const updateUserProfile = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: image
        }).then(() => {
            const updatedProfile = auth.currentUser;
            setUser(updatedProfile)
        })
    }

    // google Login
    const googleProvider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    };

    // observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            try {
                if (currentUser?.email) {
                    setUser(currentUser);
                    // Fetch the JWT token
                    const { data } = await axios.post(
                        `https://lost-and-found-server-two.vercel.app/jwt`,
                        { email: currentUser.email },
                        { withCredentials: true }
                    );
                    // console.log(data, "This is the token");
                } else {
                    setUser(null);
                    const { data } = await axios.get(
                        `https://lost-and-found-server-two.vercel.app/logout`,
                        { withCredentials: true }
                    );
                }
            } catch (err) {
                console.error("Error fetching JWT token:", err);
            } finally {
                setLoading(false); // Always stop loading regardless of the outcome
            }
        });

        return () => {
            unsubscribe(); // Clean up the listener on unmount
        };
    }, []);



    const authInfo = {
        handleRegister,
        signInWithGoogle,
        logIn,
        logOut,
        updateUserProfile,
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