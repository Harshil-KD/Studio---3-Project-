import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword } from "firebase/auth";

// Initialize your authentication instance
export const auth = getAuth();

// Function to create a new user with email and password
export const doCreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

// Function to sign in with email and password
export const doSignInUserWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}


export const doSignInWithGoogle = async (email, password) => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    return result;
}


// Function to sign out the current user
export const doSignOut = () => {
    return auth.signOut();
}

// Function to send a password reset email
export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
}

// Function to update the password of the current user
export const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password);
}

// Function to send email verification
export const doSendMailVerification = () => {
    return sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`
    })
}