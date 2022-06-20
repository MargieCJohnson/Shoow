import firebase from "firebase/app";
import { auth } from "./firebase";


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export function signUp(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

export function signIn(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

export function resetPassword(emailAddress) {
  return auth.sendPasswordResetEmail(emailAddress);
}

export function signOut() {
  return auth.signOut();
}