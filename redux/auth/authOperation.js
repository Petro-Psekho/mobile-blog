import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { authSlice } from './authReducer';

import { app, db } from '../../firebase/config';

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password, login)
      .then(userCredential => {
        const user = userCredential.user;

        console.log('userCredential.user >>>>>>>>', user);
        console.log('auth.CurrentUser >>>>>>', auth.currentUser);

        dispatch(
          updateUserProfile({
            userId: user.uid,
            login: login,
          })
        );
      })
      .catch(error => {
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
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };
export const authSignOutUser = () => async (dispatch, getState) => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      dispatch(authSignOut());
    })
    .catch(error => {
      // An error happened.
    });
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  const auth = getAuth();
  onAuthStateChanged(auth, user => {
    if (user) {
      const uid = user.uid;
      console.log('user', user);

      const userUdateProfile = {
        userId: uid,
      };
      dispatch(updateUserProfile(userUdateProfile));
      dispatch(authStateChange({ stateChange: true }));
    } else {
      // User is signed out
    }
  });
};
