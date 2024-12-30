import { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    FacebookAuthProvider,
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    getRedirectResult
} from "firebase/auth";
import app from "../Firebase/firebase.init";
import axios from "axios";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();
const gitProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Authentication Functions
    const createUserWithEmail = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginWithEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const loginWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    };

    const loginWithFacebook = () => {
        return signInWithPopup(auth, fbProvider);
    };

    const loginWithGitHub = () => {
        return signInWithRedirect(auth, gitProvider);
    };

    const signOutUser = () => {
        return signOut(auth);
    };

    useEffect(() => {
        getRedirectResult(auth)
            .then((result) => {
                if (result && result.user) {
                    // console.log("Redirect Login Successful:", result.user);
                    setUser(result.user);
                }
            })
            .catch((error) => console.error("Redirect Error:", error));
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser?.email) {
                const user = { email: currentUser.email };
                axios.post('https://job-portal-server-alpha-seven.vercel.app/jwt', user, { withCredentials: true })
                    .then(res => {
                        setLoading(false);
                    })
            }
            else {
                axios.post('https://job-portal-server-alpha-seven.vercel.app/logout', {}, {
                    withCredentials: true
                })
                    .then(res => {
                        // console.log('logout', res.data)
                        setLoading(false);
                    })
            }
        });
        return () => unsubscribe();
    }, []);


    const authInfo = {
        createUserWithEmail,
        loginWithEmail,
        loginWithGoogle,
        loginWithFacebook,
        loginWithGitHub,
        signOutUser,
        user,
        loading,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
