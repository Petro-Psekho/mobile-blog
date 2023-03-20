import React from "react";
import {} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import DefaultScreenPosts from "../nestedScreens/DefaultScreenPosts";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        options={{ headerShown: true }}
        name={"DefaultScreen"}
        component={DefaultScreenPosts}
      />
      <NestedScreen.Screen name={"Comments"} component={CommentsScreen} />
      <NestedScreen.Screen name={"Map"} component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
