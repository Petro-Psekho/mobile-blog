import React, { useState, useEffect, useCallback } from "react";

import {} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRoute } from "../router";

// import { app, db, auth } from "../firebase/config";

const Main = () => {
  const [user, setUser] = useState(null);

  const state = useSelector((state) => state);

  // console.log("Main state>>>>>>>>>>>>", state.auth);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      const uid = user.uid;
    } else {
      // User is signed out
    }
  });
  const routing = useRoute(user);
  useEffect(() => {}, []);
  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
