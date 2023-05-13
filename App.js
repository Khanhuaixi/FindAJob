import "react-native-gesture-handler";

import * as eva from "@eva-design/eva";
import {
  DefaultTheme,
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import React from "react";
import LoginScreen from "./src/features/Auth/screens/LoginScreen";
import SignupScreen from "./src/features/Auth/screens/SignupScreen";
import { AdminTabBar } from "./src/features/admin/navigation/AdminTabBar";
import AdminApplicantList from "./src/features/admin/screens/AdminApplicantList";
import AdminEmployerList from "./src/features/admin/screens/AdminEmployerList";
import AdminEmployerManagement from "./src/features/admin/screens/AdminEmployerManagement";
import AdminJobList from "./src/features/admin/screens/AdminJobList";
import AdminJobManagement from "./src/features/admin/screens/AdminJobManagement";
import AdminProfile from "./src/features/admin/screens/AdminProfile";
import { EmployerTabBar } from "./src/features/employer/navigation/EmployerTabBar";
import EmployerProfile from "./src/features/employer/screens/EmployerProfile";
import EmployerJobList from "./src/features/employer/screens/EmployerJobList";
import AdminApplicantManagement from "./src/features/admin/screens/AdminApplicantManagement";
import EmployerJobList from "./src/features/employer/screens/EmployerJobList";

// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();

function getAdminTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "AdminTabBar";
  switch (routeName) {
    case "AdminJobList":
      return "Job List";
    case "AdminTabBar":
    case "AdminEmployerList":
      return "Employer List";
    case "AdminApplicantList":
      return "Applicant List";
    case "AdminProfile":
      return "Profile";
  }
}

function getEmployerTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "EmployerTabBar";
  switch (routeName) {
    case "Employer Job List":
      return "Job List";
    case "Employer Profile":
      return "Profile";
  }
}

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerTitle: "Login",
            }}
          />
          <Stack.Screen
            name="SignupScreen"
            component={SignupScreen}
            options={{
              headerTitle: "Sign Up",
            }}
          />
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
          <Stack.Screen
            name="AdminApplicantList"
            component={AdminApplicantList}
          />
          <Stack.Screen name="AdminProfile" component={AdminProfile} />

          <Stack.Screen
            name="AdminJobManagement"
            component={AdminJobManagement}
            options={() => ({
              headerTitle: "Job Detail",
            })}
          />
          <Stack.Screen
            name="AdminEmployerManagement"
            component={AdminEmployerManagement}
            options={() => ({
              headerTitle: "Employer Detail",
            })}
          />
          <Stack.Screen
            name="AdminApplicantManagement"
            component={AdminApplicantManagement}
            options={() => ({
              headerTitle: "Applicant Detail",
            })}
          />

          <Stack.Screen
            name="EmployerTabBar"
            component={EmployerTabBar}
            options={({ route }) => ({
              headerTitle: getEmployerTitle(route),
            })}
          />
          <Stack.Screen
            name="EmployerJobList"
            component={EmployerJobList}
            options={() => ({
              headerTitle: "Employer Job List",
            })}
          />
          <Stack.Screen
            name="EmployerProfile"
            component={EmployerProfile}
            options={() => ({
              headerTitle: "Employer Profile",
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  </>
);
