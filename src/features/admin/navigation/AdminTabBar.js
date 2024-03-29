import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AdminApplicantList from "../screens/AdminApplicantList";
import AdminEmployerList from "../screens/AdminEmployerList";
import AdminJobList from "../screens/AdminJobList";
import AdminProfile from "../screens/AdminProfile";

const Tab = createMaterialBottomTabNavigator();

export function AdminTabBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="AdminEmployerList"
        component={AdminEmployerList}
        options={{
          tabBarLabel: "Employers",
          tabBarIcon: () => <Ionicons name="business-outline" size={20} />,
        }}
      />
      <Tab.Screen
        name="AdminJobList"
        component={AdminJobList}
        options={{
          tabBarLabel: "Jobs",
          tabBarIcon: () => <Ionicons name="briefcase-outline" size={20} />,
        }}
      />
      <Tab.Screen
        name="AdminApplicantList"
        component={AdminApplicantList}
        options={{
          tabBarLabel: "Applicants",
          tabBarIcon: () => <Ionicons name="person-outline" size={20} />,
        }}
      />
      <Tab.Screen
        name="AdminProfile"
        component={AdminProfile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: () => <Ionicons name="person-circle-outline" size={20} />,
        }}
      />
    </Tab.Navigator>
  );
}
