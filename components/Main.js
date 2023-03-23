import React, { useState, useEffect, useCallback } from 'react';

import {} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRoute } from '../router';

import { authStateChangeUser } from '../redux/auth/authOperation';

// import { app, db, auth } from "../firebase/config";

const Main = () => {
  const state = useSelector(state => state);

  dispatch = useDispatch();

  console.log('Main state>>>>>>>>>>>>', state);
  console.log('Main state.auth>>>>>>>>>>>>', state.auth.userId);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRoute(state.auth.userId);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
