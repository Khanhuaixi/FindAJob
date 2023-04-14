import "react-native-gesture-handler";

import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AdminTabBar } from "./src/features/admin/navigation/AdminTabBar";
import AdminJobList from "./src/features/admin/screens/AdminJobList";
import AdminEmployerList from "./src/features/admin/screens/AdminEmployerList";
import AdminMemberList from "./src/features/admin/screens/AdminMemberList";
import AdminProfile from "./src/features/admin/screens/AdminProfile";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import AdminJobManagement from "./src/features/admin/screens/AdminJobManagement";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};

// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();

function getAdminTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Admin";
  switch (routeName) {
    case "AdminJobList":
      return "Job List";
    case "AdminEmployerList":
      return "Employer List";
    case "AdminMemberList":
      return "Member List";
    case "AdminProfile":
      return "Profile";
  }
}

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AdminTabBar">
          {/* <Stack.Screen name="Login" component={LogIn} />
        <Stack.Screen name="SignUp" component={SignUp} /> */}
          <Stack.Screen
            name="AdminTabBar"
            component={AdminTabBar}
            options={({ route }) => ({
              headerTitle: getAdminTitle(route),
            })}
          />
          <Stack.Screen name="AdminJobList" component={AdminJobList} />
          <Stack.Screen
            name="AdminEmployerList"
            component={AdminEmployerList}
          />
          <Stack.Screen name="AdminMemberList" component={AdminMemberList} />
          <Stack.Screen name="AdminProfile" component={AdminProfile} />

          <Stack.Screen
            name="AdminJobManagement"
            component={AdminJobManagement}
            options={() => ({
              headerTitle: "Job Detail",
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}
