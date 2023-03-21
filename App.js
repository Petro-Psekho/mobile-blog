import React, { useState, useEffect, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase/config';

import { View, Text, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import store from './redux/store';

import { useRoute } from './router';

// SplashScreen.preventAutoHideAsync();

export default function App() {
  // const [appIsReady, setAppIsReady] = useState(false);
  const [user, setUser] = useState(null);

  const auth = getAuth();
  onAuthStateChanged(auth, user => {
    console.log('User change --->', user);
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      setUser(user);
      const uid = user.uid;
      console.log('----uid---->', uid);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  const routing = useRoute(user);

  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       await Font.loadAsync({
  //         'Roboto-400': require('./assets/Roboto-Regular.ttf'),
  //         'Roboto-500': require('./assets/Roboto-Medium.ttf'),
  //       });
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       setAppIsReady(true);
  //     }
  //   }

  //   prepare();
  // }, []);

  // const onLayoutRootView = useCallback(async () => {
  //   if (appIsReady) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [appIsReady]);

  // if (!appIsReady) {
  //   return null;
  // }

  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//  <View  onLayout={onLayoutRootView}></View>
