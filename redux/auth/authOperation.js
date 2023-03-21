// import { db, auth } from '../../firebase/config';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { authSlice } from './authReducer';

export const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    console.log('login>>>>>>', login);
    console.log('password>>>>>>', password);
    console.log('email>>>>>>', email);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        // ...
        dispatch(authSlice.actions.updateUserProfile({ userId: user.uid }));
        console.log('auth authSignUpUser----->', auth);
        console.log('user authSignUpUser----->', user);
        console.log('user.uid authSignUpUser----->', user.uid);
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
        console.log('auth2 ----->', auth);
        console.log('user2 ----->', user);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };
export const authSignOutUser = () => async (dispatch, getState) => {};
export const authStateChangeUser = () => async (dispatch, getState) => {};
