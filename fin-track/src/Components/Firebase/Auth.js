import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword } from "firebase/auth";
<<<<<<< HEAD
import { app } from "./Firebase";
=======
>>>>>>> parent of 54c2a60 (Copy code and files from google-authentication branch to main branch)

// Initialize your authentication instance
export const auth = getAuth();

// Your other functions remain the same
export const doCreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}


export const doSignInUserWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const doSignInWithGoogle = async (email, password) => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    return result;
}

export const doSignOut = () => {
    return auth.signOut();
}

export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
}

export const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password);
}

export const doSendMailVerification = () => {
    return sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`
    })
}