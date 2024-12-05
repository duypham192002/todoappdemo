import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // sendEmailVerification,
  // sendPasswordResetEmail,
  // updatePassword,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

export const doCreateUserEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInUserEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignOut = () => {
  return auth.signOut();
};

// export const doPasswordReset = (email) => {
//   return sendPasswordResetEmail(auth, email);
// };

// export const doPasswordChange = (password) => {
//   if (auth.currentUser) {
//     return updatePassword(auth.currentUser, password);
//   } else {
//     throw new Error("No authenticated user found");
//   }
// };

// export const doSendEmailVerification = () => {
//   if (auth.currentUser) {
//     return sendEmailVerification(auth.currentUser, {
//       url: `${window.location.origin}`,
//     });
//   } else {
//     throw new Error("No authenticated user found");
//   }
// };
