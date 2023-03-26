// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>
//         testing2 Testing Open up App.js to start working on your app!!!!!!
//       </Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import "react-native-gesture-handler";

import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/features/Auth/screens/LoginScreen";
import RegistrationScreen from "./src/features/Auth/screens/RegistrationScreen";
import AdminDashboard from "./src/features/admin/screens/AdminDashboard";
import ApplicantHome from "./src/features/applicant/screens/ApplicantHome";
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};

const Stack = createStackNavigator();

export default function App() {
  var userid = "";
  var username = "";

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Login"}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="ApplicantHome" component={ApplicantHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
