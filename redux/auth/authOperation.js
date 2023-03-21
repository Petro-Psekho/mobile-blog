import { db, auth } from "../../firebase/config";
console.log("db------>", db);
console.log("auth------>", auth);

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    console.log("email, password, login ----->", email, password, login);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };
export const authSignInUser = () => async (dispatch, getState) => {};
export const authSignOutUser = () => async (dispatch, getState) => {};
