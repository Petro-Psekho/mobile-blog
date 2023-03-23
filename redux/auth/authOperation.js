import {
  getAuth,
  onAuthStateChanged,
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
        const user = userCredential.user;

        console.log("userCredential.user >>>>>>>>", user);
        console.log("auth.CurrentUser >>>>>>", auth.currentUser);

        // user.updateProfile({ displayName: login });
        const upload = user;
        console.log("displayName", upload.displayName);
        console.log("uid", upload.uid);
        console.log("email", upload.email);

        dispatch(
          authSlice.actions.updateUserProfile({
            userId: user.uid,
            login: login,
          })
        );
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
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };
export const authSignOutUser = () => async (dispatch, getState) => {};

export const authStateChangeUser = () => async (dispatch, getState) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      setUser(user);
      const uid = user.uid;

      // ...
    } else {
      // User is signed out
      // ...
    }
  });
};
