import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authSlice } from "./authReducer";

export const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password, login)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user authSignUpUser----->", user);
        console.log("user displayName----->", user.displayName);
        console.log("auth displayName----->", auth.currentUser.displayName);

        console.log("user.updateProile displayName----->", user.displayName);

        // ...
        dispatch(
          authSlice.actions.updateUserProfile({
            userId: user.uid,
            login: login,
          })
        );
        console.log("auth authSignUpUser----->", auth);
        console.log("user authSignUpUser----->", user);
        console.log("user.uid authSignUpUser----->", user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };
export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log("auth2 ----->", auth);
        console.log("user2 ----->", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };
export const authSignOutUser = () => async (dispatch, getState) => {};
export const authStateChangeUser = () => async (dispatch, getState) => {};
